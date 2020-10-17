import React, { useState } from 'react';
import firebase from '@firebase/app';
function Product() {
  const [option, setOption] = useState('');
  const [data, setData] = useState({
    name: '',
    lastDate: '',
  });
  const addProduct = (event) => {
    event.preventDefault();
    console.log('send data...' + data.name, data.lastDate, option);
    firebase
      .firestore()
      .collection('products')
      .add({
        name: data.name,
        lastDate: data.lastDate,
        date: option,
        token: token(),
      })
      .then((quantityAfter) => {
        console.log('the amount was saved successfully', quantityAfter);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  var rand = function () {
    return Math.random().toString(36).substr(2);
  };
  var token = function () {
    return rand() + rand();
  };
  return (
    <div>
      <form>
        <div>
          <label>
            Name:
            <input type="text" onChange={handleInputChange} name="name" />
          </label>
        </div>
        <div>
          <h4>How soon will you buy</h4>
          <div>
            <input
              type="radio"
              name="date"
              id="soon"
              value="Soon (in the next 7 days)"
              onClick={() => setOption('7')}
            />
            <label> Soon (in the next 7 days)</label>
          </div>
          <div>
            <input
              type="radio"
              name="date"
              id="kind"
              value=" Kind of soon (in the next 14 days)"
              onClick={() => setOption('14')}
            />
            <label> Kind of soon (in the next 14 days) </label>
          </div>
          <div>
            <input
              type="radio"
              name="date"
              id="notSoon"
              value="Not soon (in the next 30 days)"
              onClick={() => setOption('30')}
            />
            <label> Not soon (in the next 30 days) </label>
          </div>
        </div>
        <div>
          <label>
            <h4>Last purchased date</h4>
            <input type="text" onChange={handleInputChange} name="lastDate" />
          </label>
        </div>
        <div>
          <input type="submit" value="Save" name="Save" onClick={addProduct} />
        </div>
      </form>
    </div>
  );
}
export default Product;
