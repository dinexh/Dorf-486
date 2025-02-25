'use client';

import { useState } from 'react';
import './Gallery.css';

export default function GalleryUpload() {
    const [formData, setFormData] = useState({
        domain: '',
        isHeroImage: false,
        images: []
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: files
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="gallery-component">
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
                        </select>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={formData.isHeroImage}
                                onChange={(e) => setFormData({...formData, isHeroImage: e.target.checked})}
                            />
                            Set as Hero Image
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="images">Upload Images</label>
                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    {formData.images.length > 0 && (
                        <div className="image-preview-grid">
                            {Array.from(formData.images).map((file, index) => (
                                <div key={index} className="image-preview">
                                    <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Upload Images</button>
                        <button type="button" className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 