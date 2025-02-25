"use client";
import './nav.css';
import { useAuth } from '@/app/contexts/AuthContext';

const DashboardNav = () => {
    const { user, logout } = useAuth();
    
    return (
        <div className="dashboard-nav">
            <div className="dashboard-nav-one">
                <h2>Smart Village Revolution Admin Portal | KLEF </h2>
            </div>
            <div className="dashboard-nav-two">
                <h2>{user?.name || 'Loading...'}</h2>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default DashboardNav;