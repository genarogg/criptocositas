import React, { useState, useEffect } from "react";
import axios from "axios";
import img from "./cryptomonedas.png";
import img2 from "./cryptomonedas2.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    const cotizarCriptomodena = async () => {
      /* si, no hay moneda no ejecutar */
      if (moneda === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      /* Mostrar Spinner */
      guardarCargando(true);

      /* Ocultar Spinner */
      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };

    cotizarCriptomodena();
  }, [criptomoneda, moneda]);

  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <div className="vph">
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img
              className="logotipo hidden-1"
              src={img}
              alt="imagen de criptomonedas"
            />
            <img
              className="logotipo hidden-2"
              src={img2}
              alt="imagen de criptomonedas"
            />
          </div>
          <div className="one-half column">
            <h1>Cotiza criptomonedas al Instante</h1>
            <Formulario
              guardarMoneda={guardarMoneda}
              guardarCriptomoneda={guardarCriptomoneda}
            />

            {componente}
          </div>
        </div>
      </div>
      <footer>
        <div className="centrado">
          <p>
            De LATAM con{" "}
            <span role="img" aria-label="sheep">
              💜
            </span>{" "}
            para el mundo | Genarogg
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
