import React, { useState, useEffect } from 'react';
import firebase from '@firebase/app';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function Product() {
  const [option, setOption] = useState('');
  const [data, setData] = useState({
    name: '',
    lastDate: null,
  });

  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productData, setProductData] = useState([]);

  const viewMessage = (message, error) => {
    setErrorMessage(message);
    setError(error);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection(localStorage.getItem('token'))
      .onSnapshot((snapshot) => {
        let products = [];
        snapshot.forEach((doc) => products.push(format(doc.data().name)));
        setProductData(products);
      });
  }, []);

  const validateDuplicate = (product) => {
    if (productData.indexOf(product) > -1) {
      return true;
    }
    return false;
  };

  const addProduct = (colecction, nameProduct) => {
    colecction
      .add({
        name: nameProduct,
        lastDate: data.lastDate,
        date: option,
      })
      .then(() => {
        viewMessage('Successfully Added', 'success');
      })
      .catch((error) => {
        viewMessage('Error', error);
      });
  };

  const validate = async (event) => {
    event.preventDefault();
    const colecction = firebase
      .firestore()
      .collection(localStorage.getItem('token'));
    const nameProduct = format(data.name);
    try {
      const isDuplicate = validateDuplicate(nameProduct);
      if (isDuplicate) {
        viewMessage(`The product: ${data.name} already exists!!`, 'error');
      } else {
        addProduct(colecction, data.name);
      }
    } catch (e) {
      viewMessage('Error', error);
    }
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const format = (name) => {
    return name.toLowerCase().replace(/[\W]+/g, '');
  };

  return (
    <div>
      <Autocomplete
        id="products-filter"
        options={productData}
        getOptionLabel={(productData) => productData}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Filter" variant="outlined" />
        )}
      />

      <p role="alert" className={error}>
        {errorMessage}
      </p>
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
            <input type="text" />
          </label>
        </div>
        <div>
          <input type="submit" value="Save" name="Save" onClick={validate} />
        </div>
      </form>
    </div>
  );
}
export default Product;
