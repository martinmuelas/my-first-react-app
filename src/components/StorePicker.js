import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        { /* Los comentarios se colocan de esta manera */}
        { /* Y solo pueden estar despues de la etiqueta del */ }
        { /* elemento que se devuelve. Recordar que React */ }
        { /* no permite renderizar mas de un elemento padre */ }
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;
