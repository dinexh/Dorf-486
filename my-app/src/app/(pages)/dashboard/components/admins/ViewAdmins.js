'use client';

import { useState } from 'react';
import './Admins.css';

export default function ViewAdmins() {
    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="admins-component">
            <div className="admins-header">
                <h1>Manage Admins</h1>
                <div className="admins-filters">
                    <input 
                        type="text" 
                        placeholder="Search admins..." 
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                                    No admins found
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