import React from 'react';
import { Link } from 'react-router-dom';
import logoGif from '../assets/logo.gif';
import BookStore from "./Bookstore";


const Header = () => {
   const isLoggedIn = localStorage.getItem('user');
  return (
    <header className="header-container">
      <div className="logo-container">
        <img src={logoGif} alt="Logo" className="logo" />
        <h1 className="title">Bookify Books</h1>
      </div>
      <nav className="navigation-bar">
        <ul className='ul-custom'>
          <li>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" className="nav-link">
              Books
            </Link>
          </li>
          <li>
            <Link to="/book-store" className="nav-link">
              Bookstore
            </Link>
          </li>
               {isLoggedIn ? (
        <li>
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        </li>
      ) : (
        <li>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;