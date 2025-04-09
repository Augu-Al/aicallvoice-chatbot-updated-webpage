import React, { useState } from 'react';
import '../css/navbar.css';

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
        document.querySelector('.app-container').classList.toggle('nav-expanded');
    };

    return (
        <>
            <button 
                className={`nav-toggle-btn ${isExpanded ? 'expanded' : ''}`}
                onClick={toggleNavbar}
                aria-label="Toggle navigation"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
            <nav className={`navbar ${isExpanded ? 'expanded' : ''}`}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar; 