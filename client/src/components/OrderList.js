import React, { useState, useEffect } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders); // Assuming the data returned from the server is in the format { orders: [...] }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '36px' }}>Orders</h2> {/* Adjust font size */}
      <div>
        {orders.map((order) => (
          <div key={order.id} style={{ marginBottom: '20px' }}> {/* Adjust spacing */}
            <p style={{ fontSize: '18px' }}>Order ID: {order.id}</p> {/* Adjust font size */}
            <p style={{ fontSize: '18px' }}>Total Price: ${order.total_price}</p> {/* Adjust font size */}
            {/* Display other order details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;

