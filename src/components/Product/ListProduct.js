import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Product from './Product';

export default function ListProduct() {
  const [marketListCreated, setMarketListCreated] = React.useState(false);

  return (
    <FirestoreCollection
      path={localStorage.getItem('token')}
      render={({ isloading, data }) => {
        return isloading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <table>
              {!marketListCreated ? (
                <div className="visualList">
                  <div>You don't have a saved market list yet.</div>
                  <button onClick={() => setMarketListCreated(true)}>
                    Create market list
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </table>
            {marketListCreated && <Product />}
          </>
        );
      }}
    />
  );
}
