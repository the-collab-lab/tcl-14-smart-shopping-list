import React, { Fragment, useState } from 'react';

const ListShopping = () => {
  const [data, setData] = useState();
  const [list, setList] = useState([]);

  const createItems = (event) => {
    event.preventDefault();

    console.log(event.target.name);
    setList([...list, { name: data.item }]);
  };

  const onHandleInputchange = (event) => {
    setData({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Fragment>
      <form className="row" onSubmit={createItems}>
        <div className="container mt-5">
          <h3>List Shopping</h3>
          <br />
          add to the list
          <input
            name="item"
            type="text"
            placeholder="Add"
            onChange={onHandleInputchange}
          ></input>
          <button type="submit">Add</button>
        </div>
      </form>
      <div>
        {list.map((item, index) => {
          return <li type="circle">{item.name}</li>;
        })}
      </div>
    </Fragment>
  );
};

export default ListShopping;
