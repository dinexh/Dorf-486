"use client";
import './nav.css';
import {  FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

const DashboardNav = () => {
    const { user, logout } = useAuth();
    
    return (
        <div className="dashboard-nav">
            <div className="dashboard-nav-one">
                <h2>Smart Village Revolution Admin Portal | KLEF </h2>
            </div>
            <div className="dashboard-nav-two">
                <h2>{user?.name}</h2>
                <button onClick={logout}>
                    logout
                    <FaSignOutAlt />
                </button>
            </div>
        </div>
    );
}

export default DashboardNav;