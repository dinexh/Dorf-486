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
import NewsUpload from "../components/news/NewsUpload";
import ViewAdmins from "../components/manage-admins/ViewAdmins";
import AddAdmin from "../components/manage-admins/AddAdmin";
import Home from "../components/home/home";
import Updateaward from "../components/awards/Upateawards"; 
import './page.css';

export default function SuperAdminDashboard() {
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
                    onUpdateawardClick={() => setActiveComponent('awards')}  // Add this line
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