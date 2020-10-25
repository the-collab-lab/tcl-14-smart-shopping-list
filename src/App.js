import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ListShopping from './components/ListShopping';
import Home from './components/Home/home';
import TokenList from './components/List/tokenList';

export default function App() {
  const [isActive, setIsActive] = useState('List');

  return (
    <Router>
      <div className="body">
        <div className="Buttons">
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
            <Link to="/tokenList" className="no-decoration">
              Home
            </Link>
          </button>
        </div>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/list-shopping">
          <ListShopping />
        </Route>
        <Route path="/tokenList">
          <TokenList />
        </Route>
      </Switch>
    </Router>
  );
}
