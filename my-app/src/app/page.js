"use client";
import { useState, useEffect } from 'react';
import Main_footer from "./components/main_footer/main_footer";

const focusAreasData = [
    {
        title: "Health and Hygiene",
        content: "Smart Villages prioritize community health through improved sanitation, clean water access, and healthcare facilities. Regular health camps, awareness programs, and modern medical facilities ensure residents' wellbeing.",
        image: "https://example.com/health-image.jpg"
    },
    {
        title: "Agriculture",
        content: "Agriculture in Smart Villages thrives through the adoption of precision farming techniques. Leveraging technology, farmers make data-driven decisions for irrigation, fertilization, and pest control. Sustainable practices like organic farming and renewable energy integration ensure long-term environmental health.",
        image: "https://example.com/agriculture-image.jpg"
    },
    {
        title: "Quality Education",
        content: "Digital classrooms, skilled teachers, and modern learning tools enhance educational standards. Focus on practical skills and technological literacy prepares students for future opportunities.",
        image: "https://example.com/education-image.jpg"
    },
    {
        title: "Village Infrastructure",
        content: "Development of roads, drainage systems, and public facilities. Smart lighting, waste management, and digital connectivity form the backbone of village development.",
        image: "https://example.com/infrastructure-image.jpg"
    },
    {
        title: "Culture and Community",
        content: "Preserving local traditions while embracing modern development. Community centers foster social bonds and cultural exchange.",
        image: "https://example.com/culture-image.jpg"
    },
    {
        title: "Energy Availability and Efficiency",
        content: "Sustainable power solutions including solar and biogas. Smart grid systems ensure efficient energy distribution and consumption.",
        image: "https://example.com/energy-image.jpg"
    },
    {
        title: "Green Innovation",
        content: "Eco-friendly initiatives and innovative solutions for sustainable development. Focus on reducing carbon footprint and environmental protection.",
        image: "https://example.com/innovation-image.jpg"
    },
    {
        title: "Women Empowerment",
        content: "Skills development, entrepreneurship opportunities, and leadership roles for women. Creating an inclusive environment for gender equality.",
        image: "https://example.com/women-image.jpg"
    }
];

export default function Home() {
    const [selectedFocus, setSelectedFocus] = useState(focusAreasData[0]);
    const [focusAreas, setFocusAreas] = useState(focusAreasData);

    // If you need to fetch data from API later, uncomment this
    /*
    useEffect(() => {
        const fetchFocusAreas = async () => {
            try {
                const response = await fetch('/api/focus-areas');
                const data = await response.json();
                setFocusAreas(data);
                setSelectedFocus(data[0]);
            } catch (error) {
                console.error('Error fetching focus areas:', error);
            }
        };
        
        fetchFocusAreas();
    }, []);
    */

    return(
        <div className="home-component">
            <div className="home-component-focus">
                <div className="home-component-focus-in">
                    <div className="home-component-focus-in-heading">
                        <h1>Focus - 9 Way Principle</h1>
                    </div>
                    <div className="focus-component-focus-in-main">
                        <div className="focus-sidebar">
                            {focusAreas.map((area, index) => (
                                <button
                                    key={index}
                                    className={`focus-button ${selectedFocus.title === area.title ? 'active' : ''}`}
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
                                    <img src={selectedFocus.image} alt={selectedFocus.title} />
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