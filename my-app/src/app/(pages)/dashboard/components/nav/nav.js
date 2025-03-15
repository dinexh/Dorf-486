"use client";
import './nav.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

const DashboardNav = () => {
    const { user, logout, loading } = useAuth();
    
    // console.log('Current user:', user);
    // console.log('Loading state:', loading);

    return (
        <div className="dashboard-nav">
            <div className="dashboard-nav-one">
                <h2>Smart Village Revolution Admin Portal | KLEF </h2>
            </div>
            <div className="dashboard-nav-two">
                <h2>
                    {loading ? 'Loading...' : user?.name || 'Not logged in'}
                </h2>
                <button onClick={logout}>
                    logout
                    <FaSignOutAlt />
                </button>
            </div>
        </div>
    );
}

export default DashboardNav;