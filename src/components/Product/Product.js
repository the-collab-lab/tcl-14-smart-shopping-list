import React, { useState } from 'react';

function Product() {
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState();

  const submitForm = (event) => {
    event.preventDefault();
    console.log(name, selectedOption);
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
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
            <h4>Last purchased date</h4>
            <input type="text" name="date" />
          </label>
        </div>
        <div>
          <input type="submit" value="Save" name="Save" />
        </div>
      </form>
    </div>
  );
}

export default Product;
