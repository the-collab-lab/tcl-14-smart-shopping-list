import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';
import calculateEstimate from '../../lib/estimates';
import firebase from '@firebase/app';

const token = localStorage.getItem('token');

const numberPurchases = (product) => {
  if (product.numberPurchases === undefined) {
    return 1;
  } else {
    return product.numberPurchases + 1;
  }
};

const getlastPurchaseDate = (product, todayDate) => {
  if (product.lastPurchased === null) {
    return todayDate;
  } else {
    return product.lastPurchased;
  }
};

const purchase = (product) => {
  const numberOfPurchases = numberPurchases(product);
  const date = new Date();
  const lastPurchaseDate = getlastPurchaseDate(product, date);
  const lastInterval =
    product.oldPurchased.getDay() - lastPurchaseDate.getDay();

  firebase
    .firestore()
    .collection(token)
    .doc(product.id)
    .update({
      name: product.name,
      frequency: product.frequency,
      lastPurchased: new Date(),
      oldPurchased: product.lastPurchased,
      numberPurchases: numberOfPurchases,
      calculatedEstimate: calculateEstimate(
        product.frequency,
        lastInterval,
        numberOfPurchases,
      ),
    });
};

export default function ListProduct() {
  const [marketListCreated, setMarketListCreated] = React.useState(false);
  const currentDateSeconds = new Date().getTime() / 1000;

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
                </tr>
              </thead>
              <tbody>
                {data.map((value, key) => {
                  const differenceDays =
                    (currentDateSeconds -
                      (!!value.lastDate && !!value.lastDate.seconds
                        ? value.lastDate.seconds
                        : 0)) /
                    (3600 * 24);

                  return (
                    <tr key={key}>
                      <td>
                        <input
                          type="checkbox"
                          checked={differenceDays <= 1}
                          id={value.name}
                          onChange={() => purchase(value)}
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
