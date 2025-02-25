'use client';

import { useAuth } from '@/contexts/AuthContext';
import './Profile.css';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="profile-component">
            <div className="profile-component-heading">
                <h1>Profile</h1>
            </div>
            <div className="profile-component-main">
                <div className="profile-info">
                    <div className="profile-field">
                        <label>Name</label>
                        <p>{user?.name}</p>
                    </div>
                    <div className="profile-field">
                        <label>ID Number</label>
                        <p>{user?.idNumber}</p>
                    </div>
                    <div className="profile-field">
                        <label>Role</label>
                        <p className="role-badge">{user?.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 