'use client';

import { useState } from 'react';
import DashboardFooter from "../components/footer/footer";
import DashboardNav from "../components/nav/nav";
import Sidebar from "../components/sidebar/sidebar";
import Profile from "../components/profile/Profile";
import Domains from "../components/domains/Domains";
import Areas from "../components/areas/Areas";
import ViewActivities from "../components/activities/ViewActivities";
import UploadActivities from "../components/activities/UploadActivities";
import GalleryView from "../components/gallery/GalleryView";
import GalleryUpload from "../components/gallery/GalleryUpload";
import NewsView from "../components/news/NewsView";
import NewsUpload from "../components/news/NewsUpload";
import Home from "../components/home/home";
import './page.css';

export default function AdminDashboard() {
    const [activeComponent, setActiveComponent] = useState('dashboard');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'profile':
                return <Profile />;
            case 'domains':
                return <Domains />;
            case 'areas':
                return <Areas />;
            case 'activities-view':
                return <ViewActivities />;
            case 'activities-upload':
                return <UploadActivities />;
            case 'gallery-view':
                return <GalleryView />;
            case 'gallery-upload':
                return <GalleryUpload />;
            case 'news-view':
                return <NewsView />;
            case 'news-upload':
                return <NewsUpload />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="dashboard-component">
            <div className="dashboard-component-nav">
                <DashboardNav />
            </div>
            <div className="dashboard-component-main">
                <Sidebar 
                    onProfileClick={() => setActiveComponent('profile')}
                    onHomeClick={() => setActiveComponent('dashboard')}
                    onDomainsClick={() => setActiveComponent('domains')}
                    onAreasClick={() => setActiveComponent('areas')}
                    onActivitiesViewClick={() => setActiveComponent('activities-view')}
                    onActivitiesUploadClick={() => setActiveComponent('activities-upload')}
                    onGalleryViewClick={() => setActiveComponent('gallery-view')}
                    onGalleryUploadClick={() => setActiveComponent('gallery-upload')}
                    onNewsViewClick={() => setActiveComponent('news-view')}
                    onNewsUploadClick={() => setActiveComponent('news-upload')}
                />
                <div className="main-content">
                    {renderComponent()}
                </div>
            </div>
            <div className="dashboard-component-footer">
                <DashboardFooter />
            </div>
        </div>
    );
}