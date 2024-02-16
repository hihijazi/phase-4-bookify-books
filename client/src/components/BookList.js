import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/books");
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
    <div>
      <h2> </h2>
      <div>
        {books.map((book) => (
          <div
            key={book.id}
            style={{ marginLeft: "10px", marginBottom: "10px" }}
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