import React, { Fragment, useState } from 'react';
import './home.css';
import Title from './Loginlist/title/title';
import Input from './Loginlist/input/input';
import Label from './Loginlist/label/label';

const Home = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
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
        <Title text="Log in" />
        <Label text="User" />
        <Input
          attribute={{
            id: 'User',
            name: 'User',
            type: 'text',
            placeholder: 'Please enter your username',
          }}
          handleChange={handleChange}
        />
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
          Loginin
        </button>
      </div>
    </Fragment>
  );
};
export default Home;
