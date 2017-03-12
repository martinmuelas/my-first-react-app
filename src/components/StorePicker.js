import React from 'react';
import { getFunName } from '../helpers.js'

class StorePicker extends React.Component {
  // Tenemos que asociar el valor de 'this' al del componente
  // por eso creamos un constructor
  constructor() {
    super(); // Genera primero el React Component, luego instancia el obj
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(e) {
    e.preventDefault();
    console.log('Cambiaste la URL');
    // Primero capturamos el texto del input
    const storeId = this.storeInput.value;
    console.log(`Cambiando a ${storeId}`);
    // Segundo cambiamos del '/' al '/store/:storeId'
    this.context.router.transitionTo(`/store/${storeId}`);
    
  }

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
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
