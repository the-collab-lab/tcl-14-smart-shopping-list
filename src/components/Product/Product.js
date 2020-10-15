import React, { Component, useState } from 'react';

function Product() {
  const [data, setData] = useState({
    name: '',
  });

  const addProduct = (event) => {
    event.preventDefault();
    console.log('send data...' + data.name);
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <form>
        <div>
          <label>
            Name:
            <input type="text" onChange={handleInputChange} name="name" />
          </label>
        </div>
        <div>
          <input type="checkbox" name="Soon" />
          <label> Soon (in the next 7 days) </label>
        </div>

        <div>
          <input type="checkbox" name="kindSoon" />
          <label> Kind of soon (in the next 14 days) </label>
        </div>
        <div>
          <input type="checkbox" name="notSoon" />
          <label> Not soon (in the next 30 days) </label>
        </div>
        <div>
          <label>
            Last purchased date
            <input type="text" onChange={handleInputChange} name="date" />
          </label>
        </div>
        <div>
          <input type="submit" value="Save" name="Save" onClick={addProduct} />
        </div>
      </form>
    </div>
  );
}

export default Product;
