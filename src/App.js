import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ListProduct from './components/Product/ListProduct';
import Home from './components/Home/home';
import TokenList from './components/List/tokenList';
import 'boxicons';

export default function App() {
  const [isActive, setIsActive] = useState('List');

  return (
    <Router>
      <div className="body">
        <div className="Buttons">
          <button
            className={`icon ${isActive === 'home' && 'bold-button'}`}
            onClick={() => setIsActive('home')}
          >
            <Link to="/" className="no-decoration" style={{ color: 'white' }}>
              <box-icon name="home-heart" animation="tada" size="lg"></box-icon>
            </Link>
          </button>
        </div>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/list-products">
          <ListProduct />
        </Route>
        <Route path="/tokenList">
          <TokenList />
        </Route>
      </Switch>
    </Router>
  );
}
