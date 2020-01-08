import React from 'react';
import img from './cryptomonedas.png';
import Formulario from "./components/Formulario"


function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img className="logotipo" src={img} alt="imagen de criptomonedas"/>

        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al Instante</h1>
          <Formulario />
        </div>
      </div>
    </div>
  );
}

export default App;
