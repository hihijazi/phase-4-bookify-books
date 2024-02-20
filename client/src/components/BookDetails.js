import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null); 

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/books/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div style={{ marginTop: '-600px', padding: '75px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '36px' }}>Book Detail</h2> 
      {book && ( 
        <div>
          <p style={{ fontSize: '18px' }}>{book.title} by {book.author}</p>
        
        </div>
      )}
    </div>
  );
};

export default BookDetails;
