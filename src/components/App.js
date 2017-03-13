import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';


class App extends React.Component {
  
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // getInitialState
    this.state = {
      fishes: {},
      order: {}
    }
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
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App;