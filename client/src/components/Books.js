import React, { useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=YOUR_API_KEY`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      console.log("Response data:", data); // Log the response data
      setBooks(data.items || []);
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error.message); // Set error state if unsuccessful
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>} {/* Display error message if there's an error */}
      <div>
        {books.map((book) => (
          <div key={book.id}>
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

