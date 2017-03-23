import React from 'react';
import { getFunName } from '../helpers.js'

class StorePicker extends React.Component {
  /* 
  *  NOTA:
  *  Puedo ahorrarme el Binding de los métodos utilizando
  *  'Property Initializers'. Esto es, declarar los métodos
  *  como variables asociadas a funciones flecha. Transformo
  *  cada método en una variable a la que se le asigna la 
  *  función flecha correspondiente.
  *  Luego, en este caso, el constructor pierde serntido y
  *  puedo descartarlo.
  *  ⬇⬇⬇⬇
  *  */
  // Tenemos que asociar el valor de 'this' al del componente
  // por eso creamos un constructor
  // constructor() {
  //   super(); // Genera primero el React Component, luego instancia el obj
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore = (e) => {
    e.preventDefault();
    console.log('Cambiaste la URL');
    // Primero capturamos el texto del input
    const storeId = this.storeInput.value;
    console.log(`Cambiando a ${storeId}`);
    // Segundo cambiamos del '/' al '/store/:storeId'
    this.context.router.transitionTo(`/store/${storeId}`);
    
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" required 
          placeholder="Store Name"
          defaultValue={getFunName()} 
          // Vamos a crear una 'ref' para tener acceso al elemento
          // desde otras partes del componente
          // Antes se usaban String Refs, ahora son funciones:
          ref={(input) => { this.storeInput = input }}
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }

  static contextTypes = {
    router: React.PropTypes.object
  }
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
// StorePicker.contextTypes = {
//   router: React.PropTypes.object
// }

export default StorePicker;
