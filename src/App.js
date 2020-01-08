import React, { useState, useEffect } from 'react';
import axios from "axios"
import img from './cryptomonedas.png';
import Formulario from "./components/Formulario"


function App() {

  const [ moneda, guardarMoneda ] = useState("");
  const [ criptomoneda, guardarCriptomoneda ] = useState("");

  useEffect(() =>{
    const cotizarCriptomodena = async () => {
      const url = `https://min-api.cryptocompare.com/data/price?fsym=${criptomoneda}&tsyms=${moneda}`

      const resultado = await axios.get(url)
    }

    cotizarCriptomodena()
  }, [criptomoneda, moneda])

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img className="logotipo" src={img} alt="imagen de criptomonedas"/>

        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al Instante</h1>
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
