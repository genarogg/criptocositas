import React, { useState, useEffect } from 'react'
import axios from "axios"
import Criptomoneda from "./Criptomoneda"
import Error from "./Error"


function Formulario({guardarMoneda, guardarCriptomoneda}) {

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
        guardarMoneda(monedaCotizar);
        guardarCriptomoneda(criptoCotizar);
        
    }

        /* mostrar el error en caso de que exista */

        const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null
    return(
        <form action=""
            onSubmit={cotizarMoneda}
        >
            {componente}

            <div className="row">
                <label htmlFor="">Elige tu Moneda</label>
                <select className="u-full-width" name="" id=""
                    onChange={ e => guardarMonedaCotizar(e.target.value) }
                >
                    <option value="">Elige tu Moneda</option>
                    <option value="VES">Bolivar soberano | Venezuela</option>
                    
                    <option value="USD">Dolar | United states</option>
                    <option value="MXN">Peso | Mexico</option>
                    <option value="GBP">Libra | Reino Unido</option>
                    <option value="EUR">Euro | Unión Europea</option>
                </select>
            </div>

            <div className="row">
                <label htmlFor="">Elige tu Criptomoneda</label>
                <select className="u-full-width" name="" id=""
                    onChange={ e => guardarCriptoCotizar(e.target.value) }
                >
                    <option value="">Elige tu CriptoMoneda</option>
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