import React, { useState } from "react";
import "../index.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyC05Boe1MwpOND_lf0Uu_uoN1zvpGlVlT8`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data.items || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div className="search-box-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for books..."
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      {error && <div>Error: {error}</div>}
      <div className="books-container">
        {books.map((book) => (
          <div className="book-item" key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}</p>
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;

