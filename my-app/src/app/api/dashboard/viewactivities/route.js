'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './Activities.css';

export default function ViewActivities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [domains, setDomains] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);

    useEffect(() => {
        fetchActivities();
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const response = await fetch('/api/dashboard/domains');
            if (!response.ok) throw new Error('Failed to fetch domains');
            const data = await response.json();
            setDomains(data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load domains');
        }
    };

    const fetchActivities = async () => {
        // ... existing fetchActivities code ...
    };

    const handleEdit = (activity) => {
        setEditingActivity(activity);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/dashboard/activities/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingActivity),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update activity');
            }

            setActivities(activities.map(activity => 
                activity.id === editingActivity.id ? { ...editingActivity } : activity
            ));
            setIsEditModalOpen(false);
            setEditingActivity(null);
            toast.success('Activity updated successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message || 'Failed to update activity');
        }
    };

    // ... existing code ...

    return (
        <div className="activities-component">
            <div className="activities-header">
                <h1>Activities</h1>
            </div>
            <div className="table-container">
                <table className="activities-table">
                    {/* ... existing table code ... */}
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
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(activity)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(activity.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && editingActivity && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Edit Activity</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label htmlFor="edit-name">Activity Name</label>
                                <input
                                    type="text"
                                    id="edit-name"
                                    value={editingActivity.name}
                                    onChange={(e) => setEditingActivity({
                                        ...editingActivity,
                                        name: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-date">Date</label>
                                <input
                                    type="date"
                                    id="edit-date"
                                    value={editingActivity.date.split('T')[0]}
                                    onChange={(e) => setEditingActivity({
                                        ...editingActivity,
                                        date: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-domain">Domain</label>
                                <select
                                    id="edit-domain"
                                    value={editingActivity.domain_id}
                                    onChange={(e) => setEditingActivity({
                                        ...editingActivity,
                                        domain_id: e.target.value
                                    })}
                                    required
                                >
                                    <option value="">Select Domain</option>
                                    {domains.map((domain) => (
                                        <option key={domain.id} value={domain.id}>
                                            {domain.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-students">Number of Students</label>
                                <input
                                    type="number"
                                    id="edit-students"
                                    value={editingActivity.studentsParticipated}
                                    onChange={(e) => setEditingActivity({
                                        ...editingActivity,
                                        studentsParticipated: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-report">Report Link</label>
                                <input
                                    type="url"
                                    id="edit-report"
                                    value={editingActivity.reportLink}
                                    onChange={(e) => setEditingActivity({
                                        ...editingActivity,
                                        reportLink: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => {
                                    setIsEditModalOpen(false);
                                    setEditingActivity(null);
                                }}>
                                    Cancel
                                </button>
                                <button type="submit">
                                    Update Activity
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}