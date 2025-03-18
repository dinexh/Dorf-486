'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowUp, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import './page.css';
import DashboardFooter from '../dashboard/components/footer/footer';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        <>
        <div className="back-to-home">
        {showScrollToTop && (
          <button onClick={scrollToTop} className="back-to-top-button">
            <FaArrowUp />
          </button>
        )}
      </div>
      <div className='newsContainer'>
        <div className="newsContainer-in">
          <div className="newsContainer-in-header">
            <div className="newsContainer-in-header-in">
              <header className="header">
                <div className="header-in-one">
                  <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="header-in-two">
                  <h1>Our Achievements in News Articles</h1>
                </div>
                <div className="header-in-three">
                  <a href="/">Back to Home</a>
                </div>
              </header>
            </div>
          </div>

          <div className="articles-container">
            <div className="articles-grid">
              {filteredNews.map(article => (
                <div key={article.id} className="article-card">
                  <div className="article-image-wrapper">
                    <image src={article.articleLink} alt={article.title}    width={300}
          height={200}  />
                  </div>
                  <div className="article-content">
                    <span className="article-date">{new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <a href={article.ArticleUrl} target="_blank" rel="noopener noreferrer" 
                      className="read-more-btn">Read Full Article</a>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
        <div className='footer-news'>
            <DashboardFooter />
          </div>
      </div>
    </>
    );
}

export default NewsPage;