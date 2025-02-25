'use client';

import { useState } from 'react';
import './Areas.css';

export default function Areas() {
    const [areas, setAreas] = useState([]);

    return (
        <div className="areas-component">
            <div className="areas-header">
                <h1>Areas of Work</h1>
                <button className="add-area-btn">Add New Area</button>
            </div>
            <div className="areas-grid">
                {areas.length === 0 ? (
                    <div className="no-areas">
                        <p>No areas of work available. Add your first area!</p>
                    </div>
                ) : (
                    areas.map((area) => (
                        <div key={area.id} className="area-card">
                            <img src={area.image} alt={area.name} />
                            <div className="area-content">
                                <h3>{area.name}</h3>
                                <p>{area.description}</p>
                            </div>
                            <div className="area-actions">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 