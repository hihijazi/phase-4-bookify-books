// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Books from './Books';
import Login from './Login';
import Logout from './Logout';
import BookDetails from './BookDetails';
import Account from './Account';
import Signup from './Signup';
import Layout from "../Layout/index.js"
import BookStore from "./Bookstore";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route exact path="/books" element={<Books />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/books/:id" element={<BookDetails />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/book-store" element={<BookStore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;