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
          <h4>How soon will you buy</h4>
          <div>
            <input
              type="radio"
              name="date"
              id="soon"
              value="Soon (in the next 7 days)"
              onClick={() => setSelectedOption('Soon (in the next 7 days)')}
            />
            <label> Soon (in the next 7 days)</label>
          </div>
          <div>
            <input
              type="radio"
              name="date"
              id="kind"
              value=" Kind of soon (in the next 14 days)"
              onClick={() =>
                setSelectedOption('Kind of soon (in the next 14 days)')
              }
            />
            <label> Kind of soon (in the next 14 days) </label>
          </div>
          <div>
            <input
              type="radio"
              name="date"
              id="notSoon"
              value="Not soon (in the next 30 days)"
              onClick={() =>
                setSelectedOption('Not soon (in the next 30 days)')
              }
            />
            <label> Not soon (in the next 30 days) </label>
          </div>
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
