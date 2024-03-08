// Account.js
import React from 'react';

const Account = ({ username }) => {
    return (
        <div>
            <h2>Welcome, {username}</h2>
            <p>View your account details here.</p>
            {/* Add account details component or content here */}
        </div>
    );
};

export default Account;