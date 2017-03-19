import React from 'react';
import { formatPrice } from '../helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    // Puedo generar un botón con su comportamiento incluído y almacenar el JSX
    // en una variable. De esta manera puedo reutilizar el código más facilmente
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer unavailable! {removeButton}</li>
    }
    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
        </span>
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
        <CSSTransitionGroup 
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}          
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}            
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  order: React.PropTypes.object.isRequired,
  fishes: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;