'use client';
import { useState } from 'react';
import './sidebar.css';
import { 
    FaHome, FaGlobe, FaBriefcase, FaTasks, FaImages, 
    FaNewspaper, FaUser, FaUsersCog, FaChevronDown, 
    FaChevronUp, FaUpload, FaTable, FaUserPlus, FaUsers
} from 'react-icons/fa';

export default function Sidebar({ 
    userRole, 
    onProfileClick,
    onHomeClick,
    onManageAdminsViewClick,
    onManageAdminsAddClick,
    onDomainsClick,
    onAreasClick,
    onActivitiesViewClick,
    onActivitiesUploadClick,
    onGalleryViewClick,
    onGalleryUploadClick,
    onNewsViewClick,
    onNewsUploadClick
}) {
    const [openMenus, setOpenMenus] = useState({
        admins: false,
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
                        <a onClick={onHomeClick} className="menu-link" style={{ cursor: 'pointer' }}>
                            <FaHome className="menu-icon" />
                            <span>Home</span>
                        </a>
                    </li>
                    {userRole === 'superadmin' && (
                        <li className="menu-item">
                            <div className="menu-group">
                                <a 
                                    href="#"
                                    className="menu-link dropdown-trigger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleMenu('admins');
                                    }}
                                >
                                    <FaUsersCog className="menu-icon" />
                                    <span>Manage Admins</span>
                                    {openMenus.admins ? 
                                        <FaChevronUp className="dropdown-icon" /> : 
                                        <FaChevronDown className="dropdown-icon" />
                                    }
                                </a>
                                {openMenus.admins && (
                                    <ul className="submenu">
                                        <li>
                                            <a onClick={onManageAdminsViewClick} className="submenu-link" style={{ cursor: 'pointer' }}>
                                                <FaUsers className="menu-icon" />
                                                <span>View Admins</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={onManageAdminsAddClick} className="submenu-link" style={{ cursor: 'pointer' }}>
                                                <FaUserPlus className="menu-icon" />
                                                <span>Add Admin</span>
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                    )}
                    <li className="menu-item">
                        <a onClick={onDomainsClick} className="menu-link" style={{ cursor: 'pointer' }}>
                            <FaGlobe className="menu-icon" />
                            <span>Domains</span>
                        </a>
                    </li>

                    <li className="menu-item">
                        <a onClick={onAreasClick} className="menu-link" style={{ cursor: 'pointer' }}>
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
                                        <a onClick={onActivitiesViewClick} className="submenu-link" style={{ cursor: 'pointer' }}>
                                            <FaTable className="menu-icon" />
                                            <span>View Activities</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={onActivitiesUploadClick} className="submenu-link" style={{ cursor: 'pointer' }}>
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
                                        <a onClick={onGalleryViewClick} className="submenu-link" style={{ cursor: 'pointer' }}>
                                            <FaImages className="menu-icon" />
                                            <span>View Gallery</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={onGalleryUploadClick} className="submenu-link" style={{ cursor: 'pointer' }}>
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
                                        <a onClick={onNewsViewClick} className="submenu-link" style={{ cursor: 'pointer' }}>
                                            <FaTable className="menu-icon" />
                                            <span>View News</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={onNewsUploadClick} className="submenu-link" style={{ cursor: 'pointer' }}>
                                            <FaUpload className="menu-icon" />
                                            <span>Upload News</span>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>

                    <li className="menu-item">
                        <a onClick={onProfileClick} className="menu-link" style={{ cursor: 'pointer' }}>
                            <FaUser className="menu-icon" />
                            <span>Profile</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}