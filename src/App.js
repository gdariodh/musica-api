import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Letra from "./components/Letra";
import Info from "./components/Info";
import axios from "axios";

function App() {
  const [busquedaform, setBusquedaForm] = useState({});
  const [letra, setLetra] = useState('');
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaform).length === 0) return;

    const requestApi = async () => {
      const { artista, cancion } = busquedaform;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      // para llamar a dos api a la vez, sin que pare con el await
      const [letra, informacion] = await Promise.all([axios(url), axios(url2)]);
      setLetra(letra.data.lyrics);
      if (informacion.length === 0) return;
      setInfo(informacion.data.artists[0]);
    };

    requestApi();
  }, [busquedaform, info]);

  return (
    <Fragment>
      <Formulario setBusquedaForm={setBusquedaForm} />

      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <Info info={info} />
          </div>

          <div className='col-md-6'>
            <Letra letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
