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

    const GoToForgotPassword = () => {
        router.push('/auth/forgot-password');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const idNumber = formData.get('id');
        const password = formData.get('password');
        const enteredCaptcha = formData.get('captive');

        // Validate inputs
        if (!idNumber || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        // Validate captcha
        if (!enteredCaptcha || parseInt(enteredCaptcha) !== captchaValue) {
            toast.error('Invalid captcha code');
            setCaptchaValue(Math.floor(1000 + Math.random() * 9000)); // Generate new captcha
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading('Logging in...');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idNumber, password }),
            });

            if (!response.ok) {
                throw new Error(response.status === 401 ? 'Invalid credentials' : 'Server error');
            }

            const data = await response.json();
            
            // Update auth context immediately after successful login
            await checkAuth();
            
            toast.success('Login successful!');
            // Redirect based on user role
            if (data.user.role === 'superadmin') {
                router.push('/dashboard/superadmin');
            } else if (data.user.role === 'admin') {
                router.push('/dashboard/admin');
            } else {
                router.push('/dashboard/admin'); // Default to admin dashboard
            }

        } catch (error) {
            if (!navigator.onLine) {
                toast.error('No internet connection');
            } else if (error.message === 'Failed to fetch') {
                toast.error('Unable to connect to the server');
            } else {
                toast.error(error.message || 'Login failed. Please try again.');
            }
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
            toast.dismiss(loadingToast);
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
                                <input type="text" id="id" name="id" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-input-container">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        id="password" 
                                        name="password" 
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
                                <label htmlFor="">ReCaptive : {captchaValue || 'Loading...'}</label>
                                <input type="text" id="captive" name="captive" placeholder="Enter the 4-digit code above" />
                            </div>
                            <div className="form-group-button">
                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                                <p onClick={GoToForgotPassword}>Forgot Password?</p>
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