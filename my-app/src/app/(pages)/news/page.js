'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';
import DashboardFooter from '../dashboard/components/footer/footer';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

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

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="news-component">
            <div className="news-component-in">
                <div className="news-component-in-heading">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="Searchinput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <h1>Our Achievements in News Articles</h1>
                    <button onClick={() => router.push('/')}>
                        Back To home
                    </button>
                </div>
                <div className="news-component-in-main">
                    {filteredNews.map((article) => (
                        <div key={article.id} className="news-article">
                            <img src={article.articleLink} alt={article.title} />
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
            <DashboardFooter />
        </div>
    );
}

export default NewsPage;