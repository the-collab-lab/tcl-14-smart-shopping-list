import React, { useState, useEffect } from 'react';
import db from '../../lib/firebase';

function useProducts() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    db.db.collection('products').onSnapshot((snapShots) => {
      const products = snapShots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduct(products);
    });
  }, []);
  return product;
}
const ListProduct = () => {
  const product = useProducts();
  console.log(product);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Last Date</th>
          </tr>
        </thead>
        <tbody>
          {product && product !== undefined
            ? product.map((data, key) => (
                <tr key={key}>
                  <td>{data.name}</td>
                  <td>{data.date} </td>
                  <td>{data.lastDate}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
