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

  const leftOrders = orders.slice(0, 5);
  const rightOrders = orders.slice(5, 10);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ marginRight: "25px", padding: "10px" }}>
        <h2 style={{ marginTop: "0px", marginLeft: "20px" }}> </h2>
        <div>
          {leftOrders.map((order) => (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total Price: ${order.total_price}</p>
              {/* Display other order details as needed */}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <h2> </h2>
        <div>
          {rightOrders.map((order) => (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
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




