'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './Activities.css';

export default function UploadActivities() {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        domain: '',
        studentsParticipated: '',
        reportLink: ''
    });

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate form data
        if (!formData.name || !formData.date || !formData.domain || 
            !formData.studentsParticipated || !formData.reportLink) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }
        
        try {
            // Log data being sent
            console.log('Sending data:', {
                name: formData.name,
                date: formData.date,
                domain_id: formData.domain,
                studentsParticipated: formData.studentsParticipated,
                reportLink: formData.reportLink
            });

            const response = await fetch('/api/dashboard/uploadactivities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    date: formData.date,
                    domain_id: parseInt(formData.domain),
                    studentsParticipated: parseInt(formData.studentsParticipated),
                    reportLink: formData.reportLink
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to upload activity');
            }

            toast.success('Activity uploaded successfully!');
            
            // Reset form
            setFormData({
                name: '',
                date: '',
                domain: '',
                studentsParticipated: '',
                reportLink: ''
            });

            // Reset file input if it exists
            const fileInput = document.getElementById('report');
            if (fileInput) {
                fileInput.value = '';
            }

        } catch (error) {
            console.error('Error uploading activity:', error);
            toast.error(error.message || 'Failed to upload activity');
        } finally {
            setLoading(false);
        }
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
                            {domains.map((domain) => (
                                <option key={domain.id} value={domain.id}>
                                    {domain.name}
                                </option>
                            ))}
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
                        <label htmlFor="report">Activity Report Link</label>
                        <input
                            type="url"
                            id="report"
                            placeholder="Enter report URL"
                            value={formData.reportLink}
                            onChange={(e) => setFormData({...formData, reportLink: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload Activity'}
                        </button>
                        <button type="button" className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}