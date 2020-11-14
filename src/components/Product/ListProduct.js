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

  return (
    <FirestoreCollection
      path={localStorage.getItem('token')}
      render={({ data }) => {
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
                {data
                  .sort(
                    (a, b) => parseFloat(a.estimate) - parseFloat(b.estimate),
                  )
                  .map((value, key) => {
                    const differenceDays =
                      (currentDateSeconds -
                        (!!value.lastPurchasedDate &&
                        !!value.lastPurchasedDate.seconds
                          ? value.lastPurchasedDate.seconds
                          : 0)) /
                      (3600 * 24);
                    let colour = '';
                    if (value.option == 7) {
                      colour = styles.colour1;
                    }
                    if (value.option == 14) {
                      colour = styles.colour2;
                    }
                    if (value.option == 30) {
                      colour = styles.colour3;
                    }
                    return (
                      <tr key={key} className={colour}>
                        <td>
                          <input
                            type="checkbox"
                            checked={differenceDays <= 1}
                            id={value.name}
                            onChange={() => select(value)}
                          />
                          {value.name}
                        </td>
                        <td className={styles.date}>{value.option} </td>
                        <td></td>
                        <td className={styles.date}>{value.estimate}</td>
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
