import { NextResponse } from "next/server";
import mysql from "@/lib/db";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function POST(req) {
    let connection;
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        connection = await mysql.getConnection();

        // Check if user exists
        const [rows] = await connection.execute(
            'SELECT id, name FROM User WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "No account found with this email" },
                { status: 404 }
            );
        }

        const user = rows[0];

        // Generate reset token
        const resetToken = jwt.sign(
            {
                userId: user.id,
                type: 'reset'
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Create reset link
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Send email
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h1>Password Reset Request</h1>
                <p>Dear ${user.name},</p>
                <p>We received a request to reset your password. Click the link below to reset it:</p>
                <p><a href="${resetLink}">Reset Password</a></p>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        });

        return NextResponse.json({
            message: "Password reset link sent successfully"
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}