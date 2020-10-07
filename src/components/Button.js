import React from 'react';
import db from '../lib/firebase';
import { Table } from 'reactstrap';

export default class Button extends React.Component {
  state = {
    itemsD: [],
    quantity: 0,
    id: 0,
  };

  add = () =>
    this.setState({
      quantity: this.state.quantity + 1,
    });

  registerquantity = (e) => {
    const { id, quantity } = this.state;
    db.db
      .collection('lista_compras')
      .add({ ...id, quantity })
      .then((quantityAfter) => {
        console.log('Se guardo con exito la cantidad', quantityAfter);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  async componentDidMount() {
    db.db.collection('lista_compras').onSnapshot(
      (snapShots) => {
        this.setState({
          itemsD: snapShots.docs.map((doc) => {
            return { id: doc.id, data: doc.data() };
          }),
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }

  render() {
    return (
      <div>
        <div>
          <h3>{this.props.name}</h3>
          <div>quantity: {this.state.quantity}</div>
          <button onClick={this.add}> + </button>
          <button onClick={this.registerquantity}>Guardar </button>
        </div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.state.itemsD && this.state.itemsD !== undefined
                ? this.state.itemsD.map((quantity, key) => (
                    <tr key={key}>
                      <td>{quantity.data.quantity}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
