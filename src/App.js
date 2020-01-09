import React, { useState, useEffect } from 'react';
import axios from "axios"
import img from './cryptomonedas.png';
import Formulario from "./components/Formulario"
import Spinner from "./components/Spinner"


function App() {

  const [ moneda, guardarMoneda ] = useState("");
  const [ criptomoneda, guardarCriptomoneda ] = useState("");
  const [ cargando, guardarCargando ] = useState(false)

  useEffect(() =>{
    const cotizarCriptomodena = async () => {

      /* si, no hay moneda no ejecutar */
      if(moneda === "") return

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      const resultado = await axios.get(url)
      
      guardarCargando(true)

      setTimeout(() => {
        guardarCargando(false)
      }, 3000);
    }


    cotizarCriptomodena()
  }, [criptomoneda, moneda])

  const componente = (cargando) ? <Spinner /> : null;

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

          { componente }
        </div>
      </div>
    </div>
  );
}

export default App;
