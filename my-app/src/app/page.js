"use client";
import { useState, useEffect } from 'react';
import Main_footer from "./components/main_footer/main_footer";

export default function Home() {
    const [selectedFocus, setSelectedFocus] = useState(null);
    const [focusAreas, setFocusAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFocusAreas();
    }, []);

    const fetchFocusAreas = async () => {
        try {
            const response = await fetch('/api/dashboard/focusd');
            const data = await response.json();
            
            if (response.ok) {
                // Transform the data to match the expected format
                const transformedData = data.data.map(area => ({
                    id: area.id,
                    title: area.domain_name,  // Using domain_name from JOIN query
                    content: area.description,
                    image: area.imageLink
                }));
                
                setFocusAreas(transformedData);
                setSelectedFocus(transformedData[0]); // Set first item as selected
            }
        } catch (error) {
            console.error('Error fetching focus areas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (!selectedFocus) {
        return <div className="no-data">No focus areas available</div>;
    }

    return(
        <div className="home-component">
            <div className="home-component-focus">
                <div className="home-component-focus-in">
                    <div className="home-component-focus-in-heading">
                        <h1>Focus - 9 Way Principle</h1>
                    </div>
                    <div className="focus-component-focus-in-main">
                        <div className="focus-sidebar">
                            {focusAreas.map((area) => (
                                <button
                                    key={area.id}  // Using id instead of index
                                    className={`focus-button ${selectedFocus.id === area.id ? 'active' : ''}`}
                                    onClick={() => setSelectedFocus(area)}
                                >
                                    {area.title}
                                </button>
                            ))}
                        </div>
                        <div className="focus-content">
                            <div className="focus-content-heading">
                              <h2>{selectedFocus.title}</h2>
                            </div>
                            <div className="focus-content-box">
                                <div className="focus-text">
                                    {selectedFocus.content}
                                </div>
                                <div className="focus-image">
                                    <img 
                                        src={selectedFocus.image} 
                                        alt={selectedFocus.title}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Main_footer/>
        </div>
    );
}