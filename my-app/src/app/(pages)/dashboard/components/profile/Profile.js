'use client';

import { useAuth } from '@/contexts/AuthContext';
import './Profile.css';

export default function Profile() {
    const { user } = useAuth();

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
        </div>
    );
}