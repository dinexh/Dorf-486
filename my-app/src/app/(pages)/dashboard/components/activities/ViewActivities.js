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
        try {
            const response = await fetch('/api/dashboard/viewactivities');
            if (!response.ok) throw new Error('Failed to fetch activities');

            const result = await response.json();
            if (result.success) {
                setActivities(result.data || []);
            } else {
                throw new Error(result.error || 'Failed to fetch activities');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load activities');
            setActivities([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this activity?')) return;

        try {
            const response = await fetch(`/api/dashboard/viewactivities?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete activity');
            }

            toast.success('Activity deleted successfully');
            setActivities(activities.filter(activity => activity.id !== id));
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to delete activity');
        }
    };

    
    // Update the handleEditSubmit function
    const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/dashboard/editactivities', {  // Updated API path
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: editingActivity.id,
                name: editingActivity.name,
                date: new Date(editingActivity.date).toISOString().split('T')[0], // Format date properly
                domain_id: parseInt(editingActivity.domain_id),
                studentsParticipated: parseInt(editingActivity.studentsParticipated),
                reportLink: editingActivity.reportLink
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update activity');
        }

        // Refresh the activities list
        await fetchActivities();
        
        setIsEditModalOpen(false);
        setEditingActivity(null);
        toast.success('Activity updated successfully');
    } catch (error) {
        console.error('Error:', error);
        toast.error(error.message || 'Failed to update activity');
    }
};

// Update the handleEdit function
const handleEdit = (activity) => {
    // Ensure date is properly formatted for the input
    const formattedActivity = {
        ...activity,
        date: new Date(activity.date).toISOString().split('T')[0]
    };
    setEditingActivity(formattedActivity);
    setIsEditModalOpen(true);
};

    if (loading) {
        return <div className="loading">Loading activities...</div>;
    }

    return (
        <div className="activities-component">
            <div className="activities-header">
                <h1>Activities</h1>
            </div>
            <div className="table-container">
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
                                    value={editingActivity.date}
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
                                        domain_id: parseInt(e.target.value)
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