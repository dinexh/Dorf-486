import React, { useEffect, useState } from 'react';
import './News.css';
const ViewNews = () => {
        const [news, setNews] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        useEffect(() => {
            fetchNews();
        }, []);
    
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/dashboard/news');
                if (response.ok) {
                    const data = await response.json();
                    setNews(data);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        const handleDelete = async (articleId) => {
            try {
                const response = await fetch(`/api/dashboard/news/${articleId}`, {
                    method: 'DELETE',
                });
                
                if (response.ok) {
                    setNews(news.filter(article => article.id !== articleId));
                }
            } catch (error) {
                console.error('Error deleting news:', error);
            }
        };

        const filteredNews = news.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    return (
      <div className="viewnews-component">
        <div className="viewnews-component-in">
          <h1>View of News</h1>
        </div>
        <div className="viewnews-component-in-main">
        {filteredNews.map((article) => (
                        <div key={article.id} className="news-article">
                            <img src={article.articleLink} alt={article.title} />
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <span>{new Date(article.date).toLocaleDateString()}</span>
                            <button 
                                onClick={() => handleDelete(article.id)}
                                className="delete-button"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
        </div>
      </div>
    );
    }
export default ViewNews;