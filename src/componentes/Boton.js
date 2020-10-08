import React from 'react';
import db from '../lib/firebase';
import { Table } from 'reactstrap';

export default class Boton extends React.Component {
  state = {
    itemsD: [],
    cantidad: 0,
    id: 0,
  };

  agregar = () =>
    this.setState({
      cantidad: this.state.cantidad + 1,
    });

  registrarCantidad = (e) => {
    const { id, cantidad } = this.state;
    db.db
      .collection('lista_compras')
      .add({ ...id, cantidad })
      .then((cantidadAfter) => {
        console.log('Se guardo con exito la cantidad', cantidadAfter);
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
          <div>Cantidad: {this.state.cantidad}</div>
          <button onClick={this.agregar}> + </button>
          <button onClick={this.registrarCantidad}>Guardar </button>
        </div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>cantidad</th>
              </tr>
            </thead>
            <tbody>
              {this.state.itemsD && this.state.itemsD !== undefined
                ? this.state.itemsD.map((cantidad, key) => (
                    <tr key={key}>
                      <td>{cantidad.data.cantidad}</td>
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
