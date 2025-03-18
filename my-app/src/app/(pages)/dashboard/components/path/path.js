'use client';
import './path.css';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const Path = ({ currentPath }) => {
    return (
        <div className="path-container">
            <Link href="/dashboard" className="path-link">
                <FaHome size={12} />
                Home
            </Link>
            <FaChevronRight size={10} className="path-separator" />
            <span className="path-current">{currentPath}</span>
        </div>
    );
};

export default Path; 