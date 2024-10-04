import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { crearTipo } from '../../services/tipoService';

export const TipoNew = ({ handleOpenModal, listarTipo }) => {

  const [valoresForm, setValoresForm] = useState({});
  const { nombres = '', fechaCreacion = '', fechaActualizacion = '', descripcion = '' } = valoresForm;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const tipo = {
      nombres, fechaCreacion, fechaActualizacion, descripcion
    };
    console.log('Enviando el tipo de media:', tipo);

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      const { data } = await crearTipo(tipo);
      handleOpenModal();
      listarTipo();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className='sidebar'>
      <div className="container-fluid">
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nuevo Tipo</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>

        <form onSubmit={handleOnSubmit}>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input type="text" name='nombres'
                  value={nombres} onChange={handleOnChange} required
                  className="form-control" />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Creación</label>
                <input type="date" name='fechaCreacion'
                  value={fechaCreacion} onChange={handleOnChange}
                  className="form-control" />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Actualización</label>
                <input type="date" name='fechaActualizacion'
                  value={fechaActualizacion} onChange={handleOnChange}
                  className="form-control" />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input type="text" name='descripcion'
                  value={descripcion} onChange={handleOnChange} required
                  className="form-control" />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
