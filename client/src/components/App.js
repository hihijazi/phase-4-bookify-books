import React, { Component } from 'react';
import '../index.css'; // Update the import path for index.css
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Update BrowserRouter alias to Router
import Home from './Home'; // Update the import paths for components
import Navbar from './Navbar'; // Update the import paths for components
import Header from './Header'; // Update the import paths for components
import Footer from './Footer'; // Update the import paths for components
import Orders from './Orders'; // Update the import paths for components
import Books from './Books'; // Update the import paths for components
import AddBook from './AddBook'; // Update the import paths for components
import BookDetails from './BookDetails'; // Update the import paths for components

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Navbar />
          <Switch> {/* Use Switch to render only the first matching route */}
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




