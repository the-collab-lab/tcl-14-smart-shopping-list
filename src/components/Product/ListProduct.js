import React from 'react';
import { FirestoreCollection } from 'react-firestore';
const ListProduct = () => {
  return (
    <FirestoreCollection
      path="products"
      render={({ isloading, data }) => {
        return isloading ? (
          <h1>Cargando</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Last Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, key) => (
                <tr key={key}>
                  <td>{value.name}</td>
                  <td>{value.date} </td>
                  <td>{value.lastDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }}
    />
  );
};
export default ListProduct;
