import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './home.css';
import Input from './Loginlist/input/input';
import Label from './Loginlist/label/label';

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

      window.location.href = 'http://localhost:3000/list-shopping';
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
            placeholder: 'Please enter your token',
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
        <Link to="/tokenList" className="no-decoration">
          Create new token.
        </Link>
      </div>
    </Fragment>
  );
};
export default Home;
