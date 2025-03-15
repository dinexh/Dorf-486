"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Auth from "@/app/assets/auth.jpg";
import "./page.css";
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
    const router = useRouter();
    const { checkAuth } = useAuth();
    const [captchaValue, setCaptchaValue] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Generate a 4-digit captcha value
        const generateCaptcha = () => {
            return Math.floor(1000 + Math.random() * 9000);
        };
        setCaptchaValue(generateCaptcha());
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const idNumber = formData.get('id');
        const password = formData.get('password');
        const enteredCaptcha = formData.get('captive');

        if (!idNumber || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!enteredCaptcha || parseInt(enteredCaptcha) !== captchaValue) {
            toast.error('Invalid captcha code');
            setCaptchaValue(Math.floor(1000 + Math.random() * 9000));
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idNumber, password }),
                credentials: 'include' // Important: include credentials
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Update auth context first
            await checkAuth();

            // Use replace instead of push
            const redirectPath = data.user.role === 'superadmin' 
                ? '/dashboard/superadmin' 
                : '/dashboard/admin';

            router.replace(redirectPath);
            
            // Show success message after navigation is queued
            toast.success('Login successful');

        } catch (error) {
            toast.error(error.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-component">
            <Toaster position="top-right" />
            <div className="login-component-in">
                <div className="login-component-in-one">
                    <Image 
                        src={Auth}
                        alt="auth"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="login-component-in-two">
                    <div className="login-component-in-two-heading">
                        <h1>Welcome to Smart Village Revolution Portal</h1>
                    </div>
                    <div className="login-component-in-two-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">EMP/ERP ID</label>
                                <input type="text" id="id" name="id" disabled={isLoading} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-input-container">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        id="password" 
                                        name="password" 
                                        disabled={isLoading}
                                    />
                                    <span 
                                        className="password-toggle" 
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="captive">ReCaptive : {captchaValue || 'Loading...'}</label>
                                <input 
                                    type="text" 
                                    id="captive" 
                                    name="captive" 
                                    placeholder="Enter the 4-digit code above"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="form-group-button">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                                <p onClick={() => router.push('/auth/forgot-password')}>Forgot Password?</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="login-component-in-copyright">
                <p>Copyright © 2025. All rights reserved by KLEF - SAC</p>
                <p>Developed by Dinesh Korukonda of ZeroOne CodeClub of KLEF SAC</p>
            </div>
        </div>
    );
}