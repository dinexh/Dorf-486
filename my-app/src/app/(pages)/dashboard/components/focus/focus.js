'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './focus.css';

const Focus = () => {
    const [formData, setFormData] = useState({
        domain_id: '',
        description: '',
        imageLink: ''
    });
    const [focusAreas, setFocusAreas] = useState([]);
    const [domains, setDomains] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArea, setEditingArea] = useState(null);

    useEffect(() => {
        fetchFocusAreas();
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const response = await fetch('/api/dashboard/domains');
            const data = await response.json();
            if (response.ok) {
                setDomains(data);
            }
        } catch (error) {
            toast.error('Error fetching domains');
        }
    };

    const fetchFocusAreas = async () => {
        try {
            const response = await fetch('/api/dashboard/focusd');
            const data = await response.json();
            if (response.ok) {
                setFocusAreas(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error fetching focus areas');
        }
    };

    const handleEdit = (area) => {
        setEditingArea(area);
        setFormData({
            domain_id: area.domain_id,
            description: area.description,
            imageLink: area.imageLink
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Adding focus area...');
        
        try {
            const response = await fetch('/api/dashboard/focusd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success('Focus area added successfully', { id: loadingToast });
                setFormData({ domain_id: '', description: '', imageLink: '' });
                fetchFocusAreas();
            } else {
                toast.error(data.message, { id: loadingToast });
            }
        } catch (error) {
            toast.error('Error adding focus area', { id: loadingToast });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Updating focus area...');
        
        try {
            const response = await fetch('/api/dashboard/focusd', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: editingArea.id,
                    ...formData
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success('Focus area updated successfully', { id: loadingToast });
                setFormData({ domain_id: '', description: '', imageLink: '' });
                setIsModalOpen(false);
                setEditingArea(null);
                fetchFocusAreas();
            } else {
                toast.error(data.message, { id: loadingToast });
            }
        } catch (error) {
            toast.error('Error updating focus area', { id: loadingToast });
        }
    };

    const handleDelete = async (id) => {
        const loadingToast = toast.loading('Deleting focus area...');
        
        try {
            const response = await fetch(`/api/dashboard/focusd?id=${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                toast.success('Focus area deleted successfully', { id: loadingToast });
                fetchFocusAreas();
            } else {
                const data = await response.json();
                toast.error(data.message, { id: loadingToast });
            }
        } catch (error) {
            toast.error('Error deleting focus area', { id: loadingToast });
        }
    };

    return (
        <div className="focus-component">
            <div className="focus-component-header">
                <h1>Focus Areas</h1>
                <p>This changes the section in home page about focus ways principal</p>
            </div>
            
            <form onSubmit={handleSubmit} className="focus-component-form">
                <div className="form-group">
                    <label htmlFor="domain_id">Domain</label>
                    <select 
                        id="domain_id"
                        value={formData.domain_id}
                        onChange={(e) => setFormData({...formData, domain_id: e.target.value})}
                        required
                    >
                        <option value="">Select Domain</option>
                        {domains.map(domain => (
                            <option key={domain.id} value={domain.id}>
                                {domain.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description (100 words)</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                        maxLength={500}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageLink">Image URL</label>
                    <input
                        type="url"
                        id="imageLink"
                        value={formData.imageLink}
                        onChange={(e) => setFormData({...formData, imageLink: e.target.value})}
                        required
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-btn">
                        Add Focus Area
                    </button>
                </div>
            </form>

            <div className="focus-component-table">
                <table>
                    <thead>
                        <tr>
                            <th>Domain</th>
                            <th>Description</th>
                            <th>Image Link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {focusAreas.map((area) => (
                            <tr key={area.id}>
                                <td>{area.domain_name}</td>
                                <td>{area.description}</td>
                                <td>
                                    <a href={area.imageLink} target="_blank" rel="noopener noreferrer">
                                        View Image
                                    </a>
                                </td>
                                <td className="action-buttons">
                                    <button 
                                        onClick={() => handleEdit(area)}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(area.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Focus Area</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="edit-domain">Domain</label>
                                <select 
                                    id="edit-domain"
                                    value={formData.domain_id}
                                    onChange={(e) => setFormData({...formData, domain_id: e.target.value})}
                                    required
                                >
                                    <option value="">Select Domain</option>
                                    {domains.map(domain => (
                                        <option key={domain.id} value={domain.id}>
                                            {domain.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-description">Description</label>
                                <textarea
                                    id="edit-description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-imageLink">Image URL</label>
                                <input
                                    type="url"
                                    id="edit-imageLink"
                                    value={formData.imageLink}
                                    onChange={(e) => setFormData({...formData, imageLink: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" className="update-btn">
                                    Update
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-btn"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingArea(null);
                                        setFormData({ domain_id: '', description: '', imageLink: '' });
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Focus;