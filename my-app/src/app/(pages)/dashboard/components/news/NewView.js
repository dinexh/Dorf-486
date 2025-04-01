import React, { useState, useEffect } from 'react';
import './News.css';

const NewView = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/dashboard/news');
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            setNews(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to load news');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (articleId) => {
        try {
            const response = await fetch(`/api/dashboard/news/${articleId}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete news');
            }
            
            setNews(news.filter(article => article.id !== articleId));
        } catch (error) {
            console.error('Error deleting news:', error);
            alert('Failed to delete news item');
        }
    };

    if (loading) return <div className="loading">Loading news...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="news-view-component">
            <div className="news-view-header">
                <h1>View News</h1>
            </div>
            <div className="news-upload-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="no-data">No news articles available</td>
                            </tr>
                        ) : (
                            news.map(article => (
                                <tr key={article.id}>
                                    <td>{article.title}</td>
                                    <td>{article.description}</td>
                                    <td>{new Date(article.date).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(article.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewView;