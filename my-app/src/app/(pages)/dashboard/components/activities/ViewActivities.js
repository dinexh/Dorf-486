'use client';

import { useState } from 'react';
import './Activities.css';

export default function ViewActivities() {
    const [activities, setActivities] = useState([]);

    return (
        <div className="activities-component">
            <div className="activities-header">
                <h1>View Activities</h1>
                <div className="activities-filters">
                    <input 
                        type="text" 
                        placeholder="Search activities..." 
                        className="search-input"
                    />
                    <select className="filter-select">
                        <option value="">All Domains</option>
                    </select>
                </div>
            </div>
            <div className="activities-table-container">
                <table className="activities-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Domain</th>
                            <th>Students</th>
                            <th>Report</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">
                                    No activities available
                                </td>
                            </tr>
                        ) : (
                            activities.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.name}</td>
                                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                                    <td>{activity.domain}</td>
                                    <td>{activity.studentsParticipated}</td>
                                    <td>
                                        <a href={activity.reportLink} target="_blank" rel="noopener noreferrer">
                                            View Report
                                        </a>
                                    </td>
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