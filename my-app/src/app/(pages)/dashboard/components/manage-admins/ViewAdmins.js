'use client';

import { useState } from 'react';
import './ManageAdmins.css';

export default function ViewAdmins() {
    const [admins, setAdmins] = useState([]);

    return (
        <div className="manage-admins-component">
            <div className="manage-admins-header">
                <h1>View Admins</h1>
                <div className="admin-filters">
                    <input 
                        type="text" 
                        placeholder="Search admins..." 
                        className="search-input"
                    />
                </div>
            </div>
            <div className="admins-table-container">
                <table className="admins-table">
                    <thead>
                        <tr>
                            <th>ID Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-data">
                                    No admins available
                                </td>
                            </tr>
                        ) : (
                            admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td>{admin.idNumber}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="edit-btn">Edit</button>
                                            <button className="delete-btn">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 