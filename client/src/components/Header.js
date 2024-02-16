import React from 'react';
import { Link } from 'react-router-dom';
import logoGif from '../assets/logo.gif';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <img src={logoGif} alt="Logo" className="logo" />
                <h1 className="title">The Boulevard Bookstore</h1>
            </div>
            <div className="links-container">
                <nav className="navigation-bar">
                    <ul>
                        <li><Link to="/Home" className="nav-link">Home</Link></li>
                        <li><Link to="/books" className="nav-link">Books</Link></li>
                        <li><Link to="/orders" className="nav-link">Orders</Link></li>
                        <li><Link to="/add-book" className="nav-link">Add Book</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;