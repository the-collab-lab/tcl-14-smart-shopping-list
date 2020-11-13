import { Search } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';
import calculateEstimate from '../../lib/estimates';
import firebase from '@firebase/app';

export default function ListProduct() {
  const [marketListCreated, setMarketListCreated] = React.useState(false);
  const [productsList, setproductsList] = useState([]);
  const [text, setext] = useState('');
  const [productsBackup, setproductsBackup] = useState([]);

  let products = [];

  const filter = (event) => {
    setproductsBackup(products);
    var text = event.target.value;
    const data = products;

    const newData = data.filter(function (item) {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setproductsList(newData);
    setext(text);
  };

  const list = !text
    ? products
    : productsList.filter((productsList) =>
        productsList.name.toLowerCase().includes(text.toLocaleLowerCase()),
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
                  <th>Date</th>
                  <th>Last Date</th>
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
                      <td>{value.date} </td>
                      <td></td>
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
