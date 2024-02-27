import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch orders
        fetch('http://127.0.0.1:5555/orders')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch orders');
                }
            })
            .then(data => {
                // Log the data structure to inspect its format
                console.log(data);
                // Update the component logic based on the data structure
                // Example: if data.orders is an array, setOrders(data.orders)
                // Example: if data.customers is an array, setCustomers(data.customers)
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <div style={{ marginTop: '-600px', padding: '75px', textAlign: 'center' }}>
            <h2 > </h2> 
            <OrderList orders={orders} customers={customers} />
        </div>
    );
};

export default Orders;

