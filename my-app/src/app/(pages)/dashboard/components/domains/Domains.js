'use client';

import { useState, useEffect } from 'react';
import './Domains.css';

export default function Domains() {
    const [domains, setDomains] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [domainName, setDomainName] = useState('');

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const response = await fetch('/api/dashboard/domains');
            if (response.ok) {
                const data = await response.json();
                setDomains(data);
            }
        } catch (error) {
            console.error('Error fetching domains:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/dashboard/domains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: domainName }),
            });
            
            if (response.ok) {
                const newDomain = await response.json();
                setDomains([newDomain, ...domains]);
                setDomainName('');
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error adding domain:', error);
        }
    };

    return (
        <div className="domains-component">
            <div className="domains-header">
                <h1>Domains</h1>
                <button className="add-domain-btn" onClick={() => setIsModalOpen(true)}>Add New Domain</button>
            </div>
            {domains.length === 0 ? (
                <div className="no-domains">
                    <p>No domains available. Add your first domain!</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="domains-table">
                        <thead>
                            <tr>
                                <th>Domain Name</th>
                                <th>Status</th>
                                {/* <th>Added Date</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domains.map((domain) => (
                                <tr key={domain.id}>
                                    <td>{domain.name}</td>
                                    <td>Active</td>
                                    {/* <td>{new Date(domain.createdAt).toLocaleDateString()}</td> */}
                                    <td>
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add New Domain</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="domainName">Domain Name:</label>
                                <input
                                    type="text"
                                    id="domainName"
                                    value={domainName}
                                    onChange={(e) => setDomainName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit">Add Domain</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}