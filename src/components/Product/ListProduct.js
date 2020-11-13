import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';
import calculateEstimate from '../../lib/estimates';
import firebase from '@firebase/app';
import swal from 'sweetalert';

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
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, key) => {
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
                      <input
                        type="submit"
                        value="Delete"
                        name="Delete"
                        onClick={() => showAlert(value)}
                      />
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
