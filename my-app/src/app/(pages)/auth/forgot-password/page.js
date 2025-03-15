'use client';

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Auth from '@/app/assets/auth.jpg';
import '../login/page.css'; // Reuse login page styles

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);

    useEffect(() => {
        // Generate a 4-digit captcha value
        const generateCaptcha = () => {
            return Math.floor(1000 + Math.random() * 9000);
        };
        setCaptchaValue(generateCaptcha());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error('Please enter your email');
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading('Sending reset link...');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send reset link');
            }

            toast.success('Password reset link sent to your email!');
            router.push('/auth/login');

        } catch (error) {
            toast.error(error.message);
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
                        <h1>Reset Your Password</h1>
                    </div>
                    <div className="login-component-in-two-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your registered email"
                                    disabled={isLoading}
                                />
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
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                                <p onClick={() => router.push('/auth/login')}>Back to Login</p>
                            </div>
                            <div className="form-group-note">
                                <p>Note: If we find your email in our database, we will send a reset link to your email address.</p>
                                <p>Link will be valid for 1 hour.</p>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}