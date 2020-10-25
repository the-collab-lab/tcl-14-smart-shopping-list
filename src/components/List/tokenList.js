import React, { useState } from 'react';
import getToken from '../../lib/tokens';

export const AddToken = () => {
  const tokenLocal = localStorage.getItem('token');
  const [token, setToken] = useState(tokenLocal);

  const handleNewToken = () => {
    if (!tokenLocal) {
      const newToken = getToken();
      setToken(newToken);
      localStorage.setItem('token', newToken);
    }
    window.location.href = '/list-products';
  };

  return (
    <div>
      {token}
      <button onClick={handleNewToken()}></button>
    </div>
  );
};

export default AddToken;
