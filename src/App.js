import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Button from './components/Button';
import Product from './components/Product/Product';

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
        </div>
      </div>
      <Switch>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/add-product">
          <AddProduct />
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
        <Button name={'Increase'} />
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
