import React, { useState } from "react";
import PropTypes from "prop-types";

const Formulario = ({ setBusquedaForm }) => {
  const [busqueda, setBusqueda] = useState({
    artista: "",
    cancion: "",
  });

  const [error, setError] = useState(false);

  const { artista, cancion } = busqueda;

  const handleState = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (artista.trim() === "" || cancion.trim() === "") return setError(true);
    setError(false);
    setBusquedaForm(busqueda);
  };

  return (
    <div className='bg-info'>
      {error ? (
        <p className='alert alert-danger text-center'>
          Todos los campos son obligatorios
        </p>
      ) : null}
      <div className='container'>
        <div className='row'>
          <form
            className='col card text-white bg-transparent mb-5 pt-5 mb-2 text-center'
            onSubmit={handleOnSubmit}>
            <fieldset>
              <legend className='text-center'>
                Buscador letras de canciones
              </legend>

              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Artista</label>
                    <input
                      type='text'
                      className='form-control'
                      name='artista'
                      placeholder='Nombre del artista'
                      value={artista}
                      onChange={handleState}
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Cancion</label>
                    <input
                      type='text'
                      className='form-control'
                      name='cancion'
                      placeholder='Nombre de la cancion'
                      value={cancion}
                      onChange={handleState}
                    />
                  </div>
                </div>
              </div>

              <button type='submit' className='btn btn-primary float-right'>
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

Formulario.propTypes = {
  setBusquedaForm: PropTypes.func.isRequired,
};

export default Formulario;
