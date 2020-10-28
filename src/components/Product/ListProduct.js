import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import { differenceInDays } from 'date-fns';

const ListProduct = () => {
  const lastDate = new Date();
  const currentDateSeconds = lastDate.getTime() / 1000;

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
                const differenceDays = differenceInDays(
                  value.lastDate.seconds,
                  currentDateSeconds,
                );

                return (
                  <tr key={key}>
                    <td>
                      <input type="checkbox" checked={differenceDays === 0} />
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
