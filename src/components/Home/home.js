import React, { Fragment, useState } from 'react';
import './home.css';
import Title from './Loginlist/title/title';
import Input from './Loginlist/input/input';
import Label from './Loginlist/label/label';
import CreateToken from './Loginlist/createToken/createToken';

const Home = () => {
  const [user, setUser] = useState('');
  const [password, setPassword, createToken] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  function handleChange(name, value) {
    if (name === 'User') {
      setUser(value);
    }
  }

  function handleSubmit() {
    let account = { user, password };
  }

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
          onClick={handleSubmit}
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
        <button
          onClick={() => handleSubmit('createToken')}
          className="submit-button-container btn btn-outline-primary"
        >
          Create new token
        </button>
      </div>
    </Fragment>
  );
};
export default Home;
