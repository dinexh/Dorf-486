'use client'
import { useState, useEffect } from 'react'
import './page.css'
import Link from 'next/link'
import Image from 'next/image'

export default function AwardsPage() {
    const [awards, setAwards] = useState([]);

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

    return (
        <div className="awards-container">
            <div className="awards-content">
                <div className="top-nav">
                    <Link href="/" className="back-button">
                        ← Back to Home
                    </Link>
                </div>

                <h1 className="awards-header">Our Achievements</h1>

                <div className="awards-grid">
                    {awards.map((award) => (
                        <div key={award.id} className="award-card">
                            <div className="award-image-container">
                                <Image
                                    src={award.image_link}
                                    alt={award.description}
                                    width={300}
                                    height={400}
                                    className="award-image"
                                />
                            </div>
                            <div className="award-details">
                                <p className="award-year">
                                    {new Date(award.award_date).toLocaleDateString()}
                                </p>
                                <p className="award-description">{award.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}