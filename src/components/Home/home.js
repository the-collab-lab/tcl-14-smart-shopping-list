import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Input from './Loginlist/input/input';

const Home = () => {
  const [entry, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  function handleChange(name) {
    setPassword(name);
  }

  const consultToken = () => {
    if (!entry.length) {
      setPasswordError(true);
    } else {
      localStorage.setItem('token', entry);
      setPasswordError(false);

      window.location.href = '/list-products';
    }
  };

  /** Using this alert instead of the ArchivalNoticeModal due to legacy deps */
  useEffect(() => {
    alert(
      'This Smart Shopping List App was made by early-career developers at The Collab Lab. This project has now been archived. To view the demo shopping list, enter the three word token: the collab lab. The following features are no longer supported: creating new lists, adding & deleting items from the list, and marking items on the list as purchased.',
    );
  }, []);

  return (
    <Fragment>
      <div className="login-container form-group">
        <div className="title">SmartShopping</div>
        <h5 className="login-phrase">Don't you have a List?</h5>
        <div className="submit-button-container">
          <Link
            to="/"
            className="no-decoration botton"
            style={{ color: '#fefefe' }}
          >
            Create new List.
          </Link>
        </div>
        <h5 className="login-phrase">Do you have a token List?</h5>
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
        <div>
          <button
            onClick={consultToken}
            className="submit-button-container  botton_enter"
            style={{ color: '#fefefe' }}
          >
            Enter my list
          </button>
          {false && (
            <createToken className="label-error">
              Invalid or incomplete token
            </createToken>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
