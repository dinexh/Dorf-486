'use client';
import { useState } from 'react';
import DashboardNav from './components/nav/nav';
import Sidebar from './components/sidebar/sidebar';
import DashboardFooter from './components/footer/footer';
import './page.css';

// Import all your components
import Home from './components/home/home';
import Profile from './components/profile/Profile';
import Domains from './components/domains/Domains';
import Areas from './components/areas/Areas';
import ViewActivities from './components/activities/ViewActivities';
import UploadActivities from './components/activities/UploadActivities';
import GalleryView from './components/gallery/GalleryView';
import GalleryUpload from './components/gallery/GalleryUpload';
import NewsUpload from './components/news/NewsUpload';
import ViewAdmins from './components/manage-admins/ViewAdmins';
import AddAdmin from './components/manage-admins/AddAdmin';
import Updateaward from './components/awards/Upateawards';
import Hero from './components/hero/hero';
import FocusAreas from './components/focus/focus';

export default function DashboardLayout({ children }) {
    const [activeComponent, setActiveComponent] = useState('dashboard');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'profile':
                return <Profile />;
            case 'manage-admins-view':
                return <ViewAdmins />;
            case 'manage-admins-add':
                return <AddAdmin />;
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
            case 'news-upload':
                return <NewsUpload />;
            case 'awards':
                return <Updateaward />;
            case 'hero-image':
                return <Hero />;
            case 'focus-areas':
                return <FocusAreas />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="dashboard-component">
            <nav className="dashboard-component-nav">
                <DashboardNav />
            </nav>
            <div className="dashboard-component-main">
                <Sidebar 
                    userRole="superadmin"
                    onProfileClick={() => setActiveComponent('profile')}
                    onHomeClick={() => setActiveComponent('dashboard')}
                    onManageAdminsViewClick={() => setActiveComponent('manage-admins-view')}
                    onManageAdminsAddClick={() => setActiveComponent('manage-admins-add')}
                    onDomainsClick={() => setActiveComponent('domains')}
                    onAreasClick={() => setActiveComponent('areas')}
                    onActivitiesViewClick={() => setActiveComponent('activities-view')}
                    onActivitiesUploadClick={() => setActiveComponent('activities-upload')}
                    onGalleryViewClick={() => setActiveComponent('gallery-view')}
                    onGalleryUploadClick={() => setActiveComponent('gallery-upload')}
                    onNewsViewClick={() => setActiveComponent('news-view')}
                    onNewsUploadClick={() => setActiveComponent('news-upload')}
                    onUpdateawardClick={() => setActiveComponent('awards')}
                    onHeroImageClick={() => setActiveComponent('hero-image')}
                    onFocusAreasClick={() => setActiveComponent('focus-areas')}
                />
                <div className="main-content">
                    {renderComponent()}
                </div>
            </div>
            <footer className="dashboard-component-footer">
                <DashboardFooter />
            </footer>
        </div>
    );
} 