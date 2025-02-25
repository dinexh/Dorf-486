'use client';

import { useState } from 'react';
import './Activities.css';

export default function UploadActivities() {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        domain: '',
        studentsParticipated: '',
        reportFile: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="activities-component">
            <div className="activities-header">
                <h1>Upload Activity</h1>
            </div>
            <div className="upload-form-container">
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="name">Activity Name</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="domain">Domain</label>
                        <select
                            id="domain"
                            value={formData.domain}
                            onChange={(e) => setFormData({...formData, domain: e.target.value})}
                            required
                        >
                            <option value="">Select Domain</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="students">Number of Students Participated</label>
                        <input
                            type="number"
                            id="students"
                            value={formData.studentsParticipated}
                            onChange={(e) => setFormData({...formData, studentsParticipated: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="report">Activity Report (PDF)</label>
                        <input
                            type="file"
                            id="report"
                            accept=".pdf"
                            onChange={(e) => setFormData({...formData, reportFile: e.target.files[0]})}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Upload Activity</button>
                        <button type="button" className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 