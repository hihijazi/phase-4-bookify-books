// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import Books from './Books';
import Login from './Login';
import Logout from './Logout';
import BookDetails from './BookDetails';
import Background from './Background'; 
import Account from './Account';
import Signup from './Signup';

const App = () => {
  const [user, setUser] = useState(null);
    return (
      <Router>
        <div className="App">
          <Background /> {/* Use the Background component here */}
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/home" > <Home user={user}/> </Route>
            <Route exact path="/login" > <Login onLogin={setUser} /> </Route>
            <Route exact path="/account" component={Account} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/books/:id" component={BookDetails} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
}

export default App;
