import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { Router, Redirect, Route } from 'react-router';

export const AddToken = () => {
  const tokenLocal = localStorage.getItem('token');
  const [token, setToken] = useState(tokenLocal);

  const handleNewToken = () => {
    if (!tokenLocal) {
      const newToken = getToken();
      localStorage.setItem('token', newToken);
    }
    window.location.href = '/list';
  };

  return (
    <div>
      {token}
      <button onClick={handleNewToken()}></button>
    </div>
  );
};
/*
const autentication = (tokenLocal) => {
  if (tokenLocal != 'token') {
    return (
        <Redirect to="/List" />
        <Route exact path="/List" component="tokenList" />)
    );
  } else {
    return <h2>Token was not created</h2>;
  }
};

export const tokenList = () => {
	
  return <div>Token was not create</div>;
};*/
export default AddToken;
