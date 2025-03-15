'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './Gallery.css';

export default function GalleryUpload() {
    const [formData, setFormData] = useState({
        domain: '',
        imageLink: '' // Single image link
    });
    const [domains, setDomains] = useState([]);

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const response = await fetch('/api/dashboard/domains');
                if (!response.ok) throw new Error('Failed to fetch domains');
                const data = await response.json();
                setDomains(data);
            } catch (error) {
                console.error('Error fetching domains:', error);
                toast.error('Failed to load domains');
            }
        };

        fetchDomains();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/dashboard/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    domain: formData.domain,
                    imageLink: formData.imageLink.trim() // Ensure no empty link
                }),
            });

            if (!response.ok) throw new Error('Failed to upload image');

            const result = await response.json();
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
        }
    };

    return (
        <div className="gallery-component">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="gallery-header">
                <h1>Upload to Gallery</h1>
            </div>
            <div className="upload-form-container">
                <form onSubmit={handleSubmit} className="upload-form">
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
                        <label htmlFor="imageLink">Image URL</label>
                        <input
                            type="url"
                            id="imageLink"
                            placeholder="Enter image URL"
                            value={formData.imageLink}
                            onChange={(e) => setFormData({...formData, imageLink: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-gallery-upload-actions">
                        <button type="submit">Add Image</button>
                        <button type="button" className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 