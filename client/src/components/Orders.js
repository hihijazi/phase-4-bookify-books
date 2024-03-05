import React, { useState, useEffect } from 'react';
import OrderList from './OrderList';

function Orders() {
    const [ order, setOrder ] = useState({}); 
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(null); 
    const [price, setPrice] = useState(0); 

    useEffect(() => {
        fetch("/orders")
          .then((r) => r.json())
          .then(setOrders);
      }, []);
      
      function handleSubmit(e) {
        e.preventDefault();
        const formData = {
          order_id: orderId, // Use the orderId state variable
          total_price: order.total_price, // Use the order state variable
          price: price, // Use the price state variable
        };
        fetch("/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

    return (
        <div style={{ marginTop: '-600px', padding: '75px', textAlign: 'center' }}>
            <h2 > </h2> 
            <OrderList orders={orders} />
        </div>
    );
};

export default Orders;
