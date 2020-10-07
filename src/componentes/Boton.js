import React from 'react';
import { compose } from 'recompose';
import { consumerFirebase } from '../Server/context';
import db from '../lib/firebase';

class Boton extends React.Component {
  state = {
    firebase: null,
    id: '1',
    cantidad: 0,
    nombre: 'manuela',
  };
  static getDerivedStateFromProps(netxProps, prevState) {
    if (netxProps.firebase === prevState.firebase) {
      return null;
    }

    return {
      firebase: netxProps.firebase,
    };
  }

  agregar = () =>
    this.setState({
      cantidad: this.state.cantidad + 1,
    });

  registrarCantidad = (e) => {
    const { id, cantidad, nombre, firebase } = this.state;
    firebase.db
      .collection('tbl_cantidad')
      .add({ ...id, cantidad, nombre })
      .then((cantidadAfter) => {
        console.log('Se guardo con exito la cantidad', cantidadAfter);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <div>Cantidad: {this.state.cantidad}</div>
        <button onClick={this.agregar}> + </button>
        <button onClick={this.registrarCantidad}>Guardar </button>
      </div>
    );
  }
}

export default compose(consumerFirebase)(Boton);
