'use client';

import { useState } from 'react';
import './ManageAdmins.css';

export default function AddAdmin() {
    const [formData, setFormData] = useState({
        name: '',
        idNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="manage-admins-component">
            <div className="manage-admins-header">
                <h1>Add New Admin</h1>
            </div>
            <div className="upload-form-container">
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idNumber">ID Number</label>
                        <input
                            type="text"
                            id="idNumber"
                            value={formData.idNumber}
                            onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Add Admin</button>
                        <button type="button" className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 