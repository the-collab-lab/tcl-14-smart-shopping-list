import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';
import calculateEstimate from '../../lib/estimates';
import firebase from '@firebase/app';
import styles from './listProduct.module.css';

export default function ListProduct() {
  const [marketListCreated, setMarketListCreated] = React.useState(false);
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

  const sortAlphabeticallyByNameAttribute = (input) => {
    return input.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  };

  const buildProductItemsGroup = (productItemsArray, colorClassName) => {
    return productItemsArray.map((productItem, key) => {
      const differenceDays =
        (currentDateSeconds -
          (!!productItem.lastPurchasedDate &&
          !!productItem.lastPurchasedDate.seconds
            ? productItem.lastPurchasedDate.seconds
            : 0)) /
        (3600 * 24);
      return (
        <tr key={key} className={colorClassName}>
          <td>
            <input
              type="checkbox"
              checked={differenceDays <= 1}
              id={productItem.name}
              onChange={() => select(productItem)}
            />
            {productItem.name}
          </td>
          <td className={styles.date}>{productItem.option} </td>
          <td></td>
          <td className={styles.date}>{productItem.estimate}</td>
        </tr>
      );
    });
  };

  return (
    <FirestoreCollection
      path={localStorage.getItem('token')}
      render={({ data }) => {
        const lowConcurrencyProductItems = sortAlphabeticallyByNameAttribute(
          data.filter((productItem) => productItem.option === '7'),
        );
        const mediumConcurrencyProductItems = sortAlphabeticallyByNameAttribute(
          data.filter((productItem) => productItem.option === '14'),
        );
        const highConcurrencyProductItems = sortAlphabeticallyByNameAttribute(
          data.filter((productItem) => productItem.option === '30'),
        );
        return !marketListCreated && data.length === 0 ? (
          <div className="visualList">
            <div>You don't have a saved market list yet.</div>
            <button onClick={() => setMarketListCreated(true)}>
              Create market list
            </button>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Last Date</th>
                  <th>Estimate</th>
                </tr>
              </thead>
              <tbody>
                {buildProductItemsGroup(
                  lowConcurrencyProductItems,
                  styles.colour1,
                )}
                {buildProductItemsGroup(
                  mediumConcurrencyProductItems,
                  styles.colour2,
                )}
                {buildProductItemsGroup(
                  highConcurrencyProductItems,
                  styles.colour3,
                )}
              </tbody>
            </table>
            <Product />
          </>
        );
      }}
    />
  );
}
