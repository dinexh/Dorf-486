'use client';

import { useState } from 'react';
import './Gallery.css';

export default function GalleryView() {
    const [gallery, setGallery] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState('');

    return (
        <div className="gallery-component">
            <div className="gallery-header">
                <h1>Gallery</h1>
                <div className="gallery-filters">
                    <select 
                        className="filter-select"
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                    >
                        <option value="">All Domains</option>
                    </select>
                </div>
            </div>
            <div className="gallery-grid">
                {gallery.length === 0 ? (
                    <div className="no-images">
                        <p>No images available in the gallery.</p>
                    </div>
                ) : (
                    gallery.map((item) => (
                        <div key={item.id} className="gallery-item">
                            <img src={item.imageLink} alt={item.imageDomain} />
                            <div className="gallery-item-overlay">
                                <p>{item.imageDomain}</p>
                                <div className="gallery-actions">
                                    <button className="view-btn">View</button>
                                    <button className="delete-btn">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 