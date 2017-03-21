import React from 'react';
import AddFishForm from './AddFishForm.js';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  // No es posible modificar el value directamente en los componentes. Lo correcto es
  // capturar los cambios y actualizar los datos en el State. Para ello hacemos esta
  // función que se ejecuta cada vez que hay un cambio en los input.
  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // Debemos hacer una copia de los nuevos datos y actualizarlo en el state
    const updatedFish = {
      ...fish, // copia todas las propiedades del fish (destructuring)
      [e.target.name]: e.target.value // sobreescribe las propiedad que disparo el cambio (equiv a name: 'value')
    }
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    // console.log(`Trying to log with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData) {
    // console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // Si llegamos acá, estamos autenticados. Vamos a capturar la información
    // almacenada en Firebase y a verificar si el usuario es el owner de la tienda
    const storeRef = base.database().ref(this.props.storeId);

    // Consultamos Firebase una vez para almacenar los datos
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // Reclama como propia si aun no tiene dueño
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      // También actualizamos el state local
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  renderLogin() {
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Login with GitHub</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Login with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
        <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>
        <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // Chequeamos si aun no se loguearon
    if (!this.state.uid) {
      return(
        <div>{this.renderLogin()}</div>
      )
    }

    // Chequeamos si el usuario logueado es el dueño de la tienda
    if (this.state.uid !== this.state.owner) {
      return(  
        <div>
          <p>Sorry, you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;