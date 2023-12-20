import React, { useState } from 'react';

export const AddToken = () => {
  const tokenLocal = localStorage.getItem('token');
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(tokenLocal);

  const handleNewToken = () => {
    // if (!tokenLocal) {
    //   const newToken = 'the collab lab';
    //   setToken(newToken);
    //   localStorage.setItem('token', newToken);
    // }
    // window.location.href = '/list-products';
    console.log('Creating new lists is no longer supported.');
  };

  return (
    <div>
      {token}
      <button onClick={handleNewToken()}></button>
    </div>
  );
};

export default AddToken;
