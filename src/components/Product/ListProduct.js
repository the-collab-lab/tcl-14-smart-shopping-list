import React from 'react';
import { FirestoreCollection } from 'react-firestore';

const ListProduct = () => {
  const currentDateSeconds = new Date().getTime() / 1000;

  return (
    <FirestoreCollection
      path={localStorage.getItem('token')}
      render={({ isloading, data }) => {
        return isloading ? (
          <h1>Loading</h1>
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
              {data.map((value, key) => {
                const differenceDays =
                  (currentDateSeconds - value.lastDate.seconds) / (3600 * 24);
                return (
                  <tr key={key}>
                    <td>
                      <input type="checkbox" checked={differenceDays <= 1} />
                      {value.name}
                    </td>
                    <td>{value.date} </td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }}
    />
  );
};
export default ListProduct;
