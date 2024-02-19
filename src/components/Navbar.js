import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const navLinkStyles = {
        fontWeight: 'normal',
        textDecoration: 'none',
    };

    const activeStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
    };

    return (
        <nav>
            {/* <NavLink style={navLinkStyles} activeStyle={activeStyles} to="/home">Home</NavLink>
            <NavLink style={navLinkStyles} activeStyle={activeStyles} to="/books">Books</NavLink>
            <NavLink style={navLinkStyles} activeStyle={activeStyles} to="/orders">Orders</NavLink>
            <NavLink style={navLinkStyles} activeStyle={activeStyles} to="/addbook">Add Book</NavLink> */}
        </nav>
    );
};

export default Navbar;