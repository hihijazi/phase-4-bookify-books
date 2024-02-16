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
    <div>
      <h2>Orders</h2>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Total Price: ${order.total_price}</p>
            {/* Display other order details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
