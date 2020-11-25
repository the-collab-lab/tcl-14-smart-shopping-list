import React, { useState } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';
import calculateEstimate from '../../lib/estimates';
import firebase from '@firebase/app';
import swal from 'sweetalert';
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
      lastPurchasedDate: new Date(),
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
          <td className={styles.date}>{productItem.estimate}</td>
          <td>
            <input
              type="submit"
              value="Delete"
              name="Delete"
              onClick={() => showAlert(productItem)}
            />
          </td>
        </tr>
      );
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
        data.map((value) => products.push(value));
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
                  <th>LastDate</th>
                  <th>Eliminar</th>
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
