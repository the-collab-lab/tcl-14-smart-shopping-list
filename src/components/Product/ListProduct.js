import React, { useState, useEffect } from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';

export default function ListProduct() {
  const [marketListCreated, setMarketListCreated] = React.useState(false);
  const [productsList, setproductsList] = useState([]);
  const [text, setext] = useState([]);
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
    ? productsList
    : productsList.filter((productsList) =>
        productsList.name.toLowerCase().includes(text.toLocaleLowerCase()),
      );

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
            <input value={text} onChange={(text) => filter(text)} />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Last Date</th>
                </tr>
              </thead>
              <tbody>
                {list.map((value, key) => (
                  <tr key={key}>
                    <td>{value.name}</td>
                    <td>{value.date} </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Product />
          </>
        );
      }}
    />
  );
}
