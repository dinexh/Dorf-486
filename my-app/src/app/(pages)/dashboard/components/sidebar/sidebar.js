'use client';
import { useState } from 'react';
import './sidebar.css';
import { 
    FaHome, FaGlobe, FaBriefcase, FaTasks, FaImages, 
    FaNewspaper, FaUser, FaUsersCog, FaChevronDown, 
    FaChevronUp, FaUpload, FaTable 
} from 'react-icons/fa';

export default function Sidebar({ userRole }) {
    const [openMenus, setOpenMenus] = useState({
        activities: false,
        gallery: false,
        news: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <ul className="menu-list">
                    <li className="menu-item">
                        <a href="/dashboard" className="menu-link">
                            <FaHome className="menu-icon" />
                            <span>Home</span>
                        </a>
                    </li>
                    {userRole === 'superadmin' && (
                        <li className="menu-item">
                            <a href="/dashboard/manage-admins" className="menu-link">
                                <FaUsersCog className="menu-icon" />
                                <span>Manage Admins</span>
                            </a>
                        </li>
                    )}
                    <li className="menu-item">
                        <a href="/dashboard/domains" className="menu-link">
                            <FaGlobe className="menu-icon" />
                            <span>Domains</span>
                        </a>
                    </li>

                    <li className="menu-item">
                        <a href="/dashboard/areas" className="menu-link">
                            <FaBriefcase className="menu-icon" />
                            <span>Areas of Work</span>
                        </a>
                    </li>

                    {/* Activities Dropdown */}
                    <li className="menu-item">
                        <div className="menu-group">
                            <a 
                                href="#"
                                className="menu-link dropdown-trigger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleMenu('activities');
                                }}
                            >
                                <FaTasks className="menu-icon" />
                                <span>Activities</span>
                                {openMenus.activities ? 
                                    <FaChevronUp className="dropdown-icon" /> : 
                                    <FaChevronDown className="dropdown-icon" />
                                }
                            </a>
                            {openMenus.activities && (
                                <ul className="submenu">
                                    <li>
                                        <a href="/dashboard/activities/view" className="submenu-link">
                                            <FaTable className="menu-icon" />
                                            <span>View Activities</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/activities/upload" className="submenu-link">
                                            <FaUpload className="menu-icon" />
                                            <span>Upload Activities</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>

                    {/* Gallery Dropdown */}
                    <li className="menu-item">
                        <div className="menu-group">
                            <a 
                                href="#"
                                className="menu-link dropdown-trigger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleMenu('gallery');
                                }}
                            >
                                <FaImages className="menu-icon" />
                                <span>Gallery</span>
                                {openMenus.gallery ? 
                                    <FaChevronUp className="dropdown-icon" /> : 
                                    <FaChevronDown className="dropdown-icon" />
                                }
                            </a>
                            {openMenus.gallery && (
                                <ul className="submenu">
                                    <li>
                                        <a href="/dashboard/gallery/view" className="submenu-link">
                                            <FaImages className="menu-icon" />
                                            <span>View Gallery</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/gallery/upload" className="submenu-link">
                                            <FaUpload className="menu-icon" />
                                            <span>Upload to Gallery</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>

                    {/* News Dropdown */}
                    <li className="menu-item">
                        <div className="menu-group">
                            <a 
                                href="#"
                                className="menu-link dropdown-trigger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleMenu('news');
                                }}
                            >
                                <FaNewspaper className="menu-icon" />
                                <span>News</span>
                                {openMenus.news ? 
                                    <FaChevronUp className="dropdown-icon" /> : 
                                    <FaChevronDown className="dropdown-icon" />
                                }
                            </a>
                            {openMenus.news && (
                                <ul className="submenu">
                                    <li>
                                        <a href="/dashboard/news/view" className="submenu-link">
                                            <FaTable className="menu-icon" />
                                            <span>View News</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/news/upload" className="submenu-link">
                                            <FaUpload className="menu-icon" />
                                            <span>Upload News</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>

                    <li className="menu-item">
                        <a href="/dashboard/profile" className="menu-link">
                            <FaUser className="menu-icon" />
                            <span>Profile</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}