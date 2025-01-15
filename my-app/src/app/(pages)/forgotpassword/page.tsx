'use client';
import { useState } from 'react';
import './page.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation to ensure ID number is not empty
    if (!idNumber.trim()) {
      setError('Please enter your ID Number');
      return;
    }

    // TODO: Implement password reset logic with email and ID number verification
    setMessage('If the email and ID Number match our records, you will receive a password reset link.');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>Forgot Password</h1>
        <p className="subtitle">Enter your details to reset your password</p>
        
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="idNumber">ID Number</label>
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter your ID Number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {message && <div className="message">{message}</div>}
          
          <button type="submit" className="reset-button">
            Reset Password
          </button>
          
          <a href="/auth" className="back-link">
            Back to Login
          </a>
        </form>
      </div>
    </div>
  );
}
