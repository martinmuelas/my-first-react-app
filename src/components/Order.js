import React from 'react';
import { formatPrice } from '../helpers'

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer unavailable!</li>
    }
    return (
      <li key={key}>
        <span>{count}lbs {fish.name}</span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }


  render() {
    // 1ro: Necesito tener un array con las 'keys' de las ordenes
    const orderIds = Object.keys(this.props.order);
    // 2do: Calculo el total de la orden
    const total = orderIds.reduce((prevTotal, key) => {
      // Por cada 'key' traigo la data del fish (precio), la 
      // order (cantidad) y el status para poder hacer cuentas
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      // Es true si el pescado esta en la orden y si está disponible
      const isAvailable = fish && fish.status;

      // Ahora hago la cuenta:
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0); // Inicializado en 0

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}            
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;