// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import Orders from './Orders';
import Books from './Books';
import AddBook from './AddBook';
import BookDetails from './BookDetails';
import Background from './Background'; // Import the Background component

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Background /> {/* Use the Background component here */}
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/orders/:id" component={Orders} />
            <Route exact path="/books/:id" component={BookDetails} />
            <Route exact path="/add-book" component={AddBook} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
