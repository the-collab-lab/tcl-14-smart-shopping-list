import React, { Component } from 'react';

function Product() {
  return (
    <div>
      <form>
        <div>
          <label>
            Name:
            <input type="text" name="name" />
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
