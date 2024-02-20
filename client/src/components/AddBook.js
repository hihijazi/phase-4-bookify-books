import React, { useState } from 'react';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const newBook = {
            title: title,
            author: author,
            genre: genre,
            price: price
        };

        fetch('/api/books/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Book added successfully');
                    setTitle('');
                    setAuthor('');
                    setGenre('');
                    setPrice('');
                } else {
                    console.error('Error adding book');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ marginTop: '-500px', fontSize: '37px' }}>Add New Book</h2>
            <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '25px' }}>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '25px' }}>Author:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '25px' }}>Genre:</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '25px' }}>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit" style={{ fontSize: '25px' }}>Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;


