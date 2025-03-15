'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './Activities.css';

export default function ViewActivities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await fetch('/api/dashboard/viewactivities');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch activities');
            }

            // Make sure we're setting an array
            setActivities(result.data || []);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load activities');
            setActivities([]); // Set empty array on error
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
                                            <button className="edit-btn">Edit</button>
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
        </div>
    );
}