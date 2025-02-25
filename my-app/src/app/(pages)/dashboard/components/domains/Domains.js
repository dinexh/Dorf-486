'use client';

import { useState } from 'react';
import './Domains.css';

export default function Domains() {
    const [domains, setDomains] = useState([]);

    return (
        <div className="domains-component">
            <div className="domains-header">
                <h1>Domains</h1>
                <button className="add-domain-btn">Add New Domain</button>
            </div>
            <div className="domains-grid">
                {domains.length === 0 ? (
                    <div className="no-domains">
                        <p>No domains available. Add your first domain!</p>
                    </div>
                ) : (
                    domains.map((domain) => (
                        <div key={domain.id} className="domain-card">
                            <img src={domain.imageLink} alt={domain.name} />
                            <h3>{domain.name}</h3>
                            <div className="domain-actions">
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