import React from 'react';
import Login from './Login'; // Import the Login component

const Home = () => {
    return (
        <div style={{ marginTop: '-600px', padding: '75px' }}> 
            <h2 style={{ fontSize: '36px' }}>Welcome to Bookify Books</h2>
            <p style={{ fontSize: '24px' }}>FIND YOUR PLACE AT BOOKIFY BOOKS BOOKSTORE</p>
            <p style={{ fontSize: '20px' }}>Feel free to explore our books, review orders, and add new books to the inventory.</p>
            
            {/* Render the Login component */}
            <Login />
        </div>
    );
};

export default Home;


