import React, { useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';
import calculateEstimate from '../../lib/estimates';
import firebase from '@firebase/app';
import moment from 'moment';

export default function ListProduct() {
  const [marketListCreated, setMarketListCreated] = React.useState(false);
  const [productsList, setproductsList] = useState([]);
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
                  <th>Option</th>
                  <th>Estimate</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.length === products.length
                  ? list.map((value, key) => {
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
                          <td>{value.option} </td>
                          <td>{value.estimate} </td>
                          <td>
                            {moment(value.lastPurchasedDate.toDate()).format(
                              'dddd, MMMM Do YYYY, h:mm:ss a',
                            )}{' '}
                          </td>
                        </tr>
                      );
                    })
                  : data.map((value, key) => {
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
                          <td>{value.option} </td>
                          <td>{value.estimate} </td>
                          <td>
                            {moment(value.lastPurchasedDate.toDate()).format(
                              'dddd, MMMM Do YYYY, h:mm:ss a',
                            )}{' '}
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
