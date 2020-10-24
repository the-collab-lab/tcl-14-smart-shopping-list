import React, { Fragment, useState, useEffect } from 'react';
import firebase from '@firebase/app';
import { Link } from 'react-router-dom';

import './home.css';
import Title from './Loginlist/title/title';
import Input from './Loginlist/input/input';
import Label from './Loginlist/label/label';
import CreateToken from './Loginlist/createToken/createToken';

const Home = () => {
  const [user, setUser] = useState('');
  const [password, setPassword, createToken] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [tokens, setToken] = useState([]);

  function handleChange(name, value) {
    if (name === 'User') {
      setUser(value);
    }
    if (name === 'token') {
      setPassword(value);
    }
  }

  const consultToken = () => {
    const isValid = tokens.some((token) => token.password === password);

    if (isValid === true) {
      localStorage.setItem('token', password);
      setPasswordError(false);
    }
    if (isValid === false) {
      setPasswordError(true);
    }
  };

  const getTokens = () => {
    firebase
      .firestore()
      .collection('tokens')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          setToken([...tokens, doc.data()]);
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <Fragment>
      <div className="login-container form-group">
        <Label text="Token" />
        <Input
          attribute={{
            id: 'token',
            name: 'token',
            type: 'password',
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
        {createToken && (
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
