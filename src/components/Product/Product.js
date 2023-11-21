import React, { useState, useEffect } from 'react';
import firebase from '@firebase/app';
import calculateEstimate from '../../lib/estimates';
import { Button, Form } from 'react-bootstrap';

function Product() {
  const [option, setOption] = useState('');
  const [data, setData] = useState({
    name: '',
    lastDate: '',
    numberPurchases: 1,
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
        console.log(products);
        setProductData(products);
      });
  }, []);

  const validateDuplicate = (product) => {
    if (productData.indexOf(product) > -1) {
      return true;
    }
    return false;
  };

  const getDiff = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const lastInterval = getDiff(new Date(), new Date());

  //These methods validate the estimate, of the purchase as it is the first purchase there is always zero.
  const estimate = calculateEstimate(
    option,
    lastInterval,
    data.numberPurchases,
  );

  const addProduct = (colecction, nameProduct) => {
    colecction
      .add({
        name: nameProduct,
        lastPurchasedDate: data.lastDate || new Date(),
        option: option,
        numberPurchases: data.numberPurchases,
        estimate: estimate,
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
    return name.toLowerCase().replace(/^\s+|\s+$/g, '');
  };

  return (
    <div>
      <p role="alert" className={error}>
        {errorMessage}
      </p>
      <Form>
        <Form.Group>
          <Form.Label>Name </Form.Label>
          <Form.Control
            type="text"
            onChange={handleInputChange}
            name="name"
            placeholder="Name Product"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Label>How soon will you buy </Form.Label>
          <Form.Check
            type="radio"
            name="date"
            id="soon"
            value="Soon (in the next 7 days)"
            onClick={() => setOption('7')}
            label="Soon (in the next 7 days)"
          />
          <Form.Check
            type="radio"
            name="date"
            id="kind"
            value=" Kind of soon (in the next 14 days)"
            onClick={() => setOption('14')}
            label="Kind of soon (in the next 14 days)"
          />
          <Form.Check
            type="radio"
            name="date"
            id="notSoon"
            value="Not soon (in the next 30 days)"
            onClick={() => setOption('30')}
            label="Not soon (in the next 30 days)"
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          value="Save"
          name="Save"
          onClick={validate}
        >
          {' '}
          Save{' '}
        </Button>
      </Form>
    </div>
  );
}
export default Product;
