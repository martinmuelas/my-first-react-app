import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { details, index } = this.props; 
    // Lo anterior es ES6 destructuring, que sería equivalente a:
    // const details = this.props.details;
    // const index = this.props.index;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button 
          disabled={!isAvailable} 
          onClick={() => this.props.addToOrder(index)}
          >{buttonText}
        </button>
      </li>
    )
  }
  
  static propTypes = {
    details: React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired
  };
}
/*
*  NOTA:
*  También puedo mover la declaración de las PropTypes dentro del
*  ámbito del componente.
*  El modificador 'static' es para indicar que no debe generarse
*  una copia con cada instancia. Dichos valores son siempre los 
*  mismos.
*  ⬇⬇⬇⬇
 */
// Fish.propTypes = {
//   details: React.PropTypes.object.isRequired,
//   index: React.PropTypes.string.isRequired,
//   addToOrder: React.PropTypes.func.isRequired
// }

export default Fish;