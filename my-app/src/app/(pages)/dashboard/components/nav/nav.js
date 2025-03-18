"use client";
import './nav.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import logo from '../../../../assets/logo.png';
const DashboardNav = () => {
    const { user, logout, loading } = useAuth();
    
    console.log('Current user:', user);
    console.log('Loading state:', loading);

    return (
        <div className="dashboard-nav">
            <div className="dashboard-nav-one">
                <Image 
                    src={logo} // Make sure to add your logo to public folder
                    alt="SVR Logo"
                    width={32}
                    height={32}
                    className="dashboard-nav-logo"
                />
                <h2>Smart Village Revolution {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'} | KLEF</h2>
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