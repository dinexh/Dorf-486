"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Auth from "@/app/assets/auth.jpg";
import "./page.css";

export default function Login() {
    const router = useRouter();
    const [captchaValue, setCaptchaValue] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

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

    return (
        <div className="login-component">
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
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">EMP/ERP ID</label>
                                <input type="text" id="id_number" name="id" />
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
                                <button type="submit">Login</button>
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