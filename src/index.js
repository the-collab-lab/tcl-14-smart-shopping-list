import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './Server/context';
import fb from './lib/firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={fb}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
