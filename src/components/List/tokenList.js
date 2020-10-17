import React, { useState } from 'react';
import getToken from '../../lib/tokens';
import { Router, Redirect, Route } from 'react-router';

export const AddToken = () => {
  const tokenLocal = localStorage.getItem('token');
  const [token, setToken] = useState(tokenLocal);

  const handleNewToken = () => {
    const newToken = getToken();
    localStorage.setItem('token', newToken);
    //window.localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <div>
      {token}
      <button onClick={handleNewToken()}></button>
    </div>
  );
};

const Autenticacion = (TokenLocal) => {
  if (TokenLocal != 'token') {
    return (
      <div>
        <Redirect to="/List" />
        <Route exact path="/List" component="tokenList" />)
      </div>
    );
  } else {
    return <h2>Token was not created</h2>;
  }
};
/*
export const tokenList = () => {
	
  return <div>Token was not create</div>;
};*/
export default AddToken;
