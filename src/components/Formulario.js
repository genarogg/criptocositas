import React, { useState, useEffect } from 'react'
import axios from "axios"
import Criptomoneda from "./Criptomoneda"


function Formulario() {

    const [ criptomonedas, guardarCriptomonedas] = useState([])
    const [ monedaCotizar, guardarMonedaCotizar ] = useState("");
    const [ criptoCotizar, guardarCriptoCotizar ] = useState("");
    const [ error, guardarError ] = useState(false);

    useEffect( () => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD"

            const resultado = await axios.get(url)
            guardarCriptomonedas(resultado.data.Data)
        }

        consultarAPI()
    }, []);

    /* Validar que el usuario llene ambos campos */
    const cotizarMoneda = e => {
        e.preventDefault();

        /* Validar si ambos estan llenos */
        if(monedaCotizar === "" || criptoCotizar === ""){
            guardarError(true);
            return;
        }

        /*  */

        guardarError(false);
        
    }

    return(
        <form action=""
            onSubmit={cotizarMoneda}
        >
            <div className="row">
                <label htmlFor="">Elige tu Moneda</label>
                <select className="u-full-width" name="" id=""
                    onChange={ e => guardarMonedaCotizar(e.target.value) }
                >
                    <option value="">Elige tu Moneda</option>
                    <option value="USD">Dolar Estado Unidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libra</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label htmlFor="">Elige tu Criptomoneda</label>
                <select className="u-full-width" name="" id=""
                    onChange={ e => guardarCriptoCotizar(e.target.value) }
                >
                    <option value="">Elige tu CrptoMoneda</option>
                    {criptomonedas.map(criptomoneda =>(
                        <Criptomoneda 
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>

            <input type="submit"
                        className="button-primary u-full-width"
                        value="CALCULAR"
            />
        </form>
    )
}

export default Formulario;