// Importamos librería React
import React from 'react';
// Importamos el método 'render' de la librería 'react-dom' 
// (No necesitamos toda la librería)
import { render } from 'react-dom';

import StorePicker from './components/StorePicker'

render(<StorePicker/>, document.querySelector('#main'));