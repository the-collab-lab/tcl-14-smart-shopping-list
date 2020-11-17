import React, { useState, useEffect } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';
import calculateEstimate from '../../lib/estimates';
import firebase from '@firebase/app';
import swal from 'sweetalert';

export default function ListProduct() {
  const [marketListCreated, setMarketListCreated] = React.useState(false);
  const [productsList, setproductsList] = useState([]);
  const [productsBackup, setproductsBackup] = useState([]);
  const [text, setext] = useState('');

  let products = [];

  const filter = (event) => {
    setproductsList(products);
    setext(event.target.value);
  };

  const list = !text
    ? products
    : productsList.filter(
        (item) => item.name.toUpperCase().indexOf(text.toUpperCase()) > -1,
      );

  const currentDateSeconds = new Date().getTime() / 1000;
  const token = localStorage.getItem('token');

  const getDiff = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const select = (product) => {
    const numberOfPurchases = product.numberPurchases + 1;
    const lastPurchase = new Date();
    const lastInterval = getDiff(
      product.lastPurchasedDate.toDate(),
      lastPurchase,
    );
    const estimate = calculateEstimate(
      product.option,
      lastInterval,
      numberOfPurchases,
    );

    firebase.firestore().collection(token).doc(product.id).update({
      numberPurchases: numberOfPurchases,
      estimate: estimate,
    });
  };

  const Delete = async (productid) => {
    firebase
      .firestore()
      .collection(token)
      .doc(productid)
      .delete()
      .then(() => {
        console.log('eliminado');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showAlert = (value) => {
    swal({
      title: 'Delete',
      text: `Are you sure about delete ${value.name} from the list?`,
      icon: 'warning',
      buttons: ['Not', 'Yes'],
    }).then((answer) => {
      if (answer) {
        Delete(value.id);
        swal({
          text: 'this article was deleted with exit',
          icon: 'success',
          timer: '2000',
        });
      }
    });
  };

  return (
    <FirestoreCollection
      path={localStorage.getItem('token')}
      render={({ data }) => {
        data.map((value) => products.push(value));
        return !marketListCreated && data.length === 0 ? (
          <div className="visualList">
            <div>You don't have a saved market list yet.</div>
            <button onClick={() => setMarketListCreated(true)}>
              Create market list
            </button>
          </div>
        ) : (
          <>
            <input
              type="search"
              value={text}
              onChange={(text) => filter(text)}
            />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {list.map((value, key) => {
                  const differenceDays =
                    (currentDateSeconds -
                      (!!value.lastPurchasedDate &&
                      !!value.lastPurchasedDate.seconds
                        ? value.lastPurchasedDate.seconds
                        : 0)) /
                    (3600 * 24);
                  return (
                    <tr key={key}>
                      <td>
                        <input
                          type="checkbox"
                          checked={differenceDays <= 1}
                          id={value.name}
                          onChange={() => select(value)}
                        />
                        {value.name}
                      </td>
                      <td>
                        <input
                          type="submit"
                          value="Delete"
                          name="Delete"
                          onClick={() => showAlert(value)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Product />
          </>
        );
      }}
    />
  );
}
