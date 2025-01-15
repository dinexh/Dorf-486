'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Hero from "../../Asessts/home.jpeg";
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './page.css'

export default function HomePage() {
  const router = useRouter();
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const generateCaptcha = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-component">
      <div className="login-component-in">
        <div className="login-component-in-one">
          <div className="login-component-in-one-in">
            <div className="login-component-in-one-in-heading">
              <h1>Koneru Lakshmaiah Education Foundation</h1>
              <h2>Social Internship Portal</h2>
            </div>
            <div className="login-component-in-one-in-form">
                <div className="form-group">
                    <label htmlFor="idNumber">ID Number / EMP ID</label>
                    <input type="text" id="idNumber" placeholder="ID Number / EMP ID" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-container">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        placeholder="Password" 
                        required 
                      />
                      <button 
                        type="button" 
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                </div>
                <div className="captcha-group">
                    <div className="captcha-text" onClick={generateCaptcha}>
                        {captcha}
                    </div>
                    <input
                        type="text"
                        className="captcha-input"
                        placeholder="Enter CAPTCHA"
                        value={userCaptcha}
                        onChange={(e) => setUserCaptcha(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-button">
                  <button type="submit">Login</button>
                </div>
                <div className="form-group-forgot-password">
                  <a onClick={() => router.push('/forgotpassword')}>Forgot Password?</a>
                </div>
                <div className="form-group-register">
                  <a onClick={() => router.push('/internship_regsiter')}>Register to Social Internship</a>
                </div>
            </div>
          </div>
        </div>
        <div className="login-component-in-two">
          <Image src={Hero} alt="Hero" width={500} height={500} />
        </div>
      </div>
      <div className="login-component-footer">
        <p>&copy;{new Date().getFullYear()} KLEF SAC. All rights reserved.</p>
        <p>Designed and Developed by Dinesh Korukonda & Garaga Pavan karthik ZeroOne CodeClub | KLEF SAC</p>
      </div>
    </div>
  );
}