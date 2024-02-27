import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const suggestedBooks = Array.from({ length: 5 }, (_, index) => ({
    title: `Book ${index + 1}`,
    author: `Author ${index + 1}`,
    id: index + 1,
  }));

  const allBooks = [...books, ...suggestedBooks];

  return (
    <div style={{ marginTop: '-100px', padding: '50px' }}>
      <h2 style={{ fontSize: '36px', textAlign: 'center' }}> </h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{ marginLeft: "10px", marginBottom: "10px", fontSize: '18px' }}
          >
            <Link to={`/books/${book.id}`}>
              {book.title} by {book.author}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;