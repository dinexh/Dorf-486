'use client';
import { useEffect, useState } from 'react';
import './page.css';
import DashboardFooter from '@/app/(pages)/dashboard/components/footer/footer';
import { useRouter } from 'next/navigation';
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Gallery = () => {
    const [heroImage, setHeroImage] = useState(null);
    const [allImages, setAllImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [uniqueDomains, setUniqueDomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState('All');
    const router = useRouter();

    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const response = await fetch('/api/main_gallery');
                if (!response.ok) throw new Error('Failed to fetch gallery images');
                const data = await response.json();
                setAllImages(data.allImages);
                setFilteredImages(data.allImages);

                // Set the first image as the hero image
                if (data.allImages.length > 0) {
                    setHeroImage(data.allImages[0]);
                }

                // Extract unique domain names
                const domains = [...new Set(data.allImages.map(image => image.domainName))];
                setUniqueDomains(['All', ...domains]);
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            }
        };

        fetchGalleryImages();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (filteredImages.length > 0) {
                const nextIndex = (currentIndex + 1) % filteredImages.length;
                setHeroImage(filteredImages[nextIndex]);
                setCurrentIndex(nextIndex);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [filteredImages, currentIndex]);

    const handleDomainClick = (domain) => {
        setSelectedDomain(domain);
        setCurrentIndex(0);
        
        if (domain === 'All') {
            setFilteredImages(allImages);
            setHeroImage(allImages[0]);
        } else {
            const filtered = allImages.filter(image => image.domainName === domain);
            setFilteredImages(filtered);
            if (filtered.length > 0) {
                setHeroImage(filtered[0]);
            }
        }
    };

    return (
        <div className="gallery-component">
            <div className="gallery-component-in">
                <div className="gallery-component-in-hero">
                    <div className="back-arrow" onClick={() => router.push('/')}>
                        <FaArrowAltCircleLeft />
                    </div>
                    {heroImage && (
                        <div className="hero-image">
                            <img src={heroImage.imageLink} alt={`Hero for ${heroImage.domainName}`} />
                            <div className="hero-text">{heroImage.domainName}</div>
                        </div>
                    )}
                </div>
                <div className="gallery-component-in-main">
                    <div className="gallery-component-in-main-heading">
                        <h1>Capturing the Spirit: Moments of SVR Through the Years</h1>
                        <h4>Our gallery is a tribute to the countless memories we've created together.</h4>
                    </div>
                    <div className="gallery-component-in-main-domains">
                        {uniqueDomains.map((domain, index) => (
                            <button 
                                key={index}
                                className={selectedDomain === domain ? 'active' : ''}
                                onClick={() => handleDomainClick(domain)}
                            >
                                {domain}
                            </button>
                        ))}
                    </div>
                    <div className="gallery-component-in-images-grid">
                        {filteredImages.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.imageLink} alt={`Image for ${image.domainName}`} />
                                <div className="image-text">{image.domainName}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <DashboardFooter />
        </div>
    );
};

export default Gallery;