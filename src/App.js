import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import TokenList from './Components/List/tokenList';

export default function App() {
  const [isActive, setIsActive] = useState('List');

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
            className={`botton ${isActive === 'tokenList' && 'bold-button'}`}
            onClick={() => setIsActive('tokenList')}
          >
            <Link to="/token-list" className="no-decoration">
              Add token
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
        <Route path="/token-list">
          <TokenList />
        </Route>
        <Route path="/add-product">
          <AddProduct />
        </Route>
      </Switch>
    </Router>
  );
}

function AddProduct() {
  return <h2>Add product</h2>;
}
