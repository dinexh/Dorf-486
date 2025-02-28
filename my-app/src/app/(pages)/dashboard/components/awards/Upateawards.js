'use client';
import { useState, useEffect } from 'react';
import './awards.css';

const Updateawards = () => {
    const [formData, setFormData] = useState({
        id: null,
        award_date: '',
        description: '',
        image_link: ''
    });
    const [awards, setAwards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const response = await fetch('/api/dashboard/awards');
            const data = await response.json();
            if (data.awards) {
                setAwards(data.awards);
            }
        } catch (error) {
            console.error('Error fetching awards:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/dashboard/awards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ id: null, award_date: '', description: '', image_link: '' });
                fetchAwards();
            }
        } catch (error) {
            console.error('Error adding award:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/dashboard/awards?id=${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchAwards();
            }
        } catch (error) {
            console.error('Error deleting award:', error);
        }
    };

    const handleEdit = (award) => {
        setFormData({
            id: award.id,
            award_date: award.award_date.split('T')[0],
            description: award.description,
            image_link: award.image_link
        });
        setIsEditing(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/dashboard/awards', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ id: null, award_date: '', description: '', image_link: '' });
                setIsEditing(false);
                fetchAwards();
            }
        } catch (error) {
            console.error('Error updating award:', error);
        }
    };

    const downloadFormat = () => {
        window.open('https://docs.google.com/spreadsheets/d/1example_id/edit?usp=sharing', '_blank');
    };

    return (
        <div className="Updateawards-component">
            <div className="Updateawards-component-heading">
                <h1>Update Awards Page</h1>
                <p>Please refer to the <a href="#" onClick={downloadFormat}>format template</a></p>
            </div>
            <div className="Updateawards-component-form">
                <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
                    <div className="updateform-group">
                        <label htmlFor="award_date">Date of The Awards</label>
                        <input 
                            type="date" 
                            name="award_date"
                            value={formData.award_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="updateform-group">
                        <label htmlFor="description">Description of The Awards</label>
                        <input 
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />   
                    </div>
                    <div className="updateform-group">
                        <label htmlFor="image_link">Image Link</label>
                        <input 
                            type="text"
                            name="image_link"
                            value={formData.image_link}
                            onChange={handleChange}
                            required
                        />    
                    </div>
                    <button type="submit">{isEditing ? 'Update Award' : 'Add Award'}</button>
                    {isEditing && (
                        <button 
                            type="button" 
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({ id: null, award_date: '', description: '', image_link: '' });
                            }}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>
            <div className="updateaward-component-table">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {awards.map((award) => (
                            <tr key={award.id}>
                                <td>{new Date(award.award_date).toLocaleDateString()}</td>
                                <td>{award.description}</td>
                                <td>
                                    <img 
                                        src={award.image_link} 
                                        alt="Award" 
                                        style={{width: '50px', height: '50px'}}
                                    />
                                </td>
                                <td className="action-buttons">
                                    <button onClick={() => handleEdit(award)}>Edit</button>
                                    <button onClick={() => handleDelete(award.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Updateawards;