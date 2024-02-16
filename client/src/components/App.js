import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Orders from "./Orders";
import Books from "./Books";
import AddBook from "./AddBook";
import BookDetails from "./BookDetails.js";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Switch>
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
      </Switch>
      <Footer />
    </>
  );
}

export default App;