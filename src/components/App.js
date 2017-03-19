import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // getInitialState
    this.state = {
      fishes: {},
      order: {}
    }
  }

  // Generamos los métodos componentWillMount() y componentWillUnmount()
  // Ambos son parte del LifeCycle de React, tal como lo es el método
  // render().
  // componentWillMount(): Invocado solo una vez, tanto en el cliente como
  // en el server, inmediatamente antes que el renderizado inicial ocurra.
  // Si se llama a 'setState' dentro de este método, render() verá el State
  // actualizado y será ejecutado solo una vez, a pesar del cambio de estado.
  componentWillMount() {
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`
        , {
            context: this,
            state: 'fishes'
        });

      // Chequeamos tambien si hay algo en el LocalStorage
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
      
      if (localStorageRef) {
        // Actualizamos el state del componente order
        this.setState({
          order: JSON.parse(localStorageRef)
        });
      }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Genero otro método del Component LifeCycle
  // componentWillUpdate(): Invocado inmediatamente antes del renderizado
  // cuando nuevas 'props' o 'state' sean recibidos. Este método no es
  // llamado en el renderizado inicial.
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, 
      JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // Para actualizar el state, primero debemos hacer una copia del state actual
    const fishes = {...this.state.fishes};
    // Ahora vamos a insertar el nuevo fish, pero para eso necesito generar una
    // clave unica, en este caso usamos un timestamp
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // Solo resta actualizar el state, indicando a React que parte del state
    // ha cambiado
    this.setState({ fishes: fishes });
    // Listo, tengo la función que actualiza el estado, ¿como la llamo desde un
    // elemento hijo como Inventory? >>> a través de una 'Props', que agrego en Inventory.
  }

  updateFish(key, updatedFish) {
    // 1ro: Copio el state actual
    const fishes = {...this.props.fishes};
    // 2do: Actualizo el valor del fish
    fishes[key] = updatedFish;
    // 3ro: Actualizo el state
    this.setState({ fishes });
  }

  removeFish(key) {
    // 1ro: Copio el state actual
    const fishes = {...this.props.fishes};
    // 2do: Elimino el fish indicado
    fishes[key] = null; // Podría haber sido: delete fishes[key]; pero no funciona bien con Firebase
    // 3ro: Actualizo el State
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder(key) {
    // 1ro: Hago copia del State:
    const order = {...this.state.order};
    // 2do: Agrego o actualizo el item en la orden
    // Si existe, le suma uno, si no existe lo agrega con valor 1
    order[key] = order[key] + 1 || 1;
    // 3ro: Actualizo el estado
    this.setState({ order });
  }

  removeFromOrder(key) {
    // 1ro: Copio el state actual
    const order = {...this.state.order};
    // 2do: Elimino el fish indicado   
    delete order[key];
    // 3ro: Actualizo el state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            { 
              Object
                .keys(this.state.fishes)
                .map(key => <Fish 
                              key={key}
                              index={key} // key es solo para React
                              details={this.state.fishes[key]} 
                              addToOrder={this.addToOrder}
                            />)
            }
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes} 
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish} 
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;

/*
* Para mejorar: Existe un doble renderizado en los componentes de la order
* y al cargar la pagina, por un segundo se puede leer 'Sorry, fish is no
* longer available!'. Esto es lo que demora entre el renderizado inicial
* del componente y el que realiza luego al cargar los datos desde el 
* localStorage.
* Para solucionarlo, habría que utilizar el LifeCycle shouldComponentUpdate()
* que mandará a renderizar el componente solo si se cumplen ciertas
* condiciones establecidas (debe retornar true).
* MAS INFO SOBRE LIFECYCLES:
* https://facebook.github.io/react/docs/react-component.html
 */