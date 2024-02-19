import React from 'react';
import '../index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Orders from "./Orders";
import Books from "./Books";
import AddBook from "./AddBook";
import BookDetails from "./BookDetails";

function App() {
  return (
    <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/books">
            <Books />
          </Route>
          <Route exact path="/orders">
            <Orders />
          </Route>
          <Route exact path="/orders/:id">
            <Orders />
          </Route>
          <Route exact path="/books/:id">
            <BookDetails />
          </Route>
          <Route exact path="/add-book">
            <AddBook />
          </Route>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;

