import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Product from './components/Product/Product';
import ListProduct from './components/Product/ListProduct';
import ListShopping from './components/ListShopping';
import Home from './components/Home/home';

export default function App() {
  const [isActive, setIsActive] = useState('list');

  return (
    <Router>
      <div className="body">
        <div className="Buttons">
          <button
            className={`botton ${isActive === 'list' && 'bold-button'}`}
            onClick={() => setIsActive('list')}
          >
            <Link to="/list" className="no-decoration">
              List
            </Link>
          </button>
          <button
            className={`botton ${isActive === 'add' && 'bold-button'}`}
            onClick={() => setIsActive('add')}
          >
            <Link to="/add-product" className="no-decoration">
              Add product
            </Link>
          </button>
          <button
            className={`botton ${isActive === 'shopping' && 'bold-button'}`}
            onClick={() => setIsActive('shopping')}
          >
            <Link to="/list-shopping" className="no-decoration">
              List shopping
            </Link>
          </button>
          <button
            className={`botton ${isActive === 'home' && 'bold-button'}`}
            onClick={() => setIsActive('home')}
          >
            <Link to="/home" className="no-decoration">
              Home
            </Link>
          </button>
        </div>
      </div>
      <Switch>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/add-product">
          <AddProduct />
        </Route>
        <Route path="/list-shopping">
          <ListShopping />
        </Route>
      </Switch>
    </Router>
  );
}

function List() {
  return (
    <div>
      <h2>List</h2>
      <div>
        <ListProduct />
      </div>
    </div>
  );
}

function AddProduct() {
  return (
    <div>
      <h2>Add product</h2>
      <div>
        <Product />
      </div>
    </div>
  );
}
