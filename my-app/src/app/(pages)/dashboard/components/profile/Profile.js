'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import './Profile.css';
import { toast } from 'react-hot-toast';

export default function Profile() {
    const { user } = useAuth();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate inputs
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error('Please fill in all password fields');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);
        const loadingToast = toast.loading('Changing password...');

        try {
            const response = await fetch('/api/dashboard/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to change password');
            }

            toast.success('Password changed successfully');
            
            // Clear form
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    return (
        <div className="profile-component">
           <div className="profile-component-main-one">
                <h1>Personal Information</h1>
                <div className="profile-component-main-one-info">
                    <div className="profile-group">
                        <label>Name</label>
                        <p>{user?.name || 'Not available'}</p>
                    </div>
                    <div className="profile-group">
                        <label>ID Number</label>
                        <p>{user?.idNumber || 'Not available'}</p>
                    </div>
                    <div className="profile-group">
                        <label>Role</label>
                        <p>{user?.role || 'Not available'}</p>
                    </div>
                    <div className="profile-group">
                        <label>Email</label>
                        <p>{user?.email || 'Not available'}</p>
                    </div>
                </div>
           </div>
           <div className="profile-component-main-two">
                <h1>Change Password</h1>
                <form onSubmit={handleSubmit} className="profile-component-main-two-info">
                    <div className="profile-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input 
                            type={showOldPassword ? "text" : "password"} 
                            id="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <button 
                            className="password-toggle"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            type="button"
                        >
                            {showOldPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                    <div className="profile-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input 
                            type={showNewPassword ? "text" : "password"} 
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <button 
                            className="password-toggle"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            type="button"
                        >
                            {showNewPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                    <div className="profile-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <button 
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            type="button"
                        >
                            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                    </div>
                    <div className="profile-group-button">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Changing Password...' : 'Change Password'}
                        </button>
                    </div>
                </form>
           </div>
        </div>
    );
} 