'use client';

import { useState } from 'react';
import './News.css';

export default function NewsUpload() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        articleImage: null,
        articleLink: ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            articleImage: file
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="news-component">
            <div className="news-header">
                <h1>Upload News</h1>
            </div>
            <div className="upload-form-container">
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-group">
                        <label htmlFor="title">News Title</label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="articleImage">News Image</label>
                        <input
                            type="file"
                            id="articleImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    {formData.articleImage && (
                        <div className="image-preview">
                            <img 
                                src={URL.createObjectURL(formData.articleImage)} 
                                alt="News preview" 
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="articleLink">Article Link</label>
                        <input
                            type="url"
                            id="articleLink"
                            value={formData.articleLink}
                            onChange={(e) => setFormData({...formData, articleLink: e.target.value})}
                            placeholder="https://example.com/article"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Upload News</button>
                        <button type="button" className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 