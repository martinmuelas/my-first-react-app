import React from 'react';

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch 
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        day
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

// Utilizamos PropTypes como una manera de validar el tipo de datos
// que deben recibir los components. Esto está pensado mas que nada
// para trabajos colaborativos.
// En caso de utilizar el componente pasandole datos con un tipo distinto
// al especificado, emitirá un error por consola, indicando que no se
// recibió el tipo de dato esperado. 
Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

/*
* Documentación sobre PropTypes:
* https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 */

export default Header;