import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell,Container, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookStore = () => {
  const [bookStore, setBookStore] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/bookstores");
      if (!response.ok) {
        throw new Error("Failed to fetch book store");
      }
      const data = await response.json();
      setBookStore(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/bookstores/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book store");
      }
      // Remove the deleted book store from the state
      setBookStore(bookStore.filter(book => book.id !== id));
      // Show toast message on successful deletion
      toast.success("Bookstore deleted successfully");
    } catch (error) {
       toast.error("Something went wrong!");
    }
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="bookstore table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell> {/* Add an additional TableCell for delete button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookStore.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} />
    </Container>
  );
};

export default BookStore;
