import React, { useState, useEffect } from "react";

// const OrderList = ({ orders, customers }) => {

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    fetch("http://127.0.0.1:5000/orders")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch orders");
        }
      })
      .then((data) => {
        // Assuming the customers' data is nested within orders, extract it
        const customers = data.map((order) => order.customer);
        setOrders(data);
        setCustomers(customers);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>
            Customer:{" "}
            {
              customers.find((customer) => customer.id === order.customer_id)
                ?.name
            }
          </p>
          <p>Total Price: ${order.total_price}</p>
          <p>Book: {order.book_id}</p>{" "}
          {/* You can modify this to display book details */}
        </div>
      ))}
    </div>
  );
};

export default OrderList;