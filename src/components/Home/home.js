import React, { Fragment, useState, useEffect } from 'react';
import firebase from '@firebase/app';
import { Link } from 'react-router-dom';

import './home.css';
import Title from './Loginlist/title/title';
import Input from './Loginlist/input/input';
import Label from './Loginlist/label/label';
import CreateToken from './Loginlist/createToken/createToken';

const Home = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  function handleChange(name) {
    setPassword(name);
  }

  const consultToken = () => {
    if (!password.length) {
      setPasswordError(true);
    } else {
      localStorage.setItem('token', password);
      setPasswordError(false);
    }
  };

  return (
    <Fragment>
      <div className="login-container form-group">
        <Label text="Token" />
        <Input
          attribute={{
            id: 'token',
            name: 'token',
            type: 'text',
            placeholder: 'Please enter your tokeaan',
          }}
          handleChange={handleChange}
          param={passwordError}
        />
        {passwordError && (
          <label className="label-error">Invalid or incomplete token</label>
        )}
        <div className="submit-button-container"></div>
        <button
          onClick={consultToken}
          className="submit-button-container btn btn-outline-primary"
        >
          Enter my list
        </button>
        {false && (
          <createToken className="label-error">
            Invalid or incomplete token
          </createToken>
        )}
        <div className="submit-button-container"></div>
        <Link to="/token-list" className="no-decoration">
          Create new token.
        </Link>
        <button className="submit-button-container btn btn-outline-primary">
          Create new token
        </button>
      </div>
    </Fragment>
  );
};
export default Home;
