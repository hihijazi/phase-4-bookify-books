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
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const row1Orders = orders.slice(0, 5);
  const row2Orders = orders.slice(5, 10);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>Orders</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ marginRight: "25px", padding: "10px", display: "flex" }}>
          {row1Orders.map((order) => (
            <div key={order.id} style={{ marginRight: "10px" }}>
              <p>Order ID: {order.id}</p>
              <p>Customer: {order.customer.name}</p>
              <p>Total Price: ${order.total_price}</p>
              {/* Display other order details as needed */}
            </div>
          ))}
        </div>
        <div style={{ padding: "10px", display: "flex" }}>
          {row2Orders.map((order) => (
            <div key={order.id} style={{ marginRight: "10px" }}>
              <p>Order ID: {order.id}</p>
              <p>Customer: {order.customer.name}</p>
              <p>Total Price: ${order.total_price}</p>
              {/* Display other order details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;