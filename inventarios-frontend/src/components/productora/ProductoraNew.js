import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { crearProductora } from '../../services/productoraService';


export const ProductoraNew = ({ handleOpenModal, listarProductoras }) => {

  const [ valoresForm, setValoresForm ] = useState([]);
  const { nombres = '', estado = '',  fechaCreacion = '',
       fechaActualizacion = '', slogan = '', descripcion = '' } = valoresForm
 


  
  const handleOnChange = ({ target }) => {
      const { name, value } = target;
      setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
      e.preventDefault();
      const productora = {
        nombres, estado, fechaCreacion, fechaActualizacion, slogan, descripcion
      }
      console.log('Enviando la productora:', productora);
      console.log(productora);
      try {
          Swal.fire({
              allowOutsideClick: false,
              text: 'Cargando...'
          });
          Swal.showLoading();
          const { data } = await crearProductora(productora);
          handleOpenModal();
          listarProductoras();
          Swal.close();
        
      } catch(error) {
          console.log(error);
          console.log('Errores de validación:', error.response.data.errores);
          Swal.close();
      }
      
  }

  return (
    <div className='sidebar'>
      <div className="container-fluid">
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nueva Productora</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>

        <form onSubmit={(e) => handleOnSubmit(e)}>
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
            <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                    <select name='estado' value={estado} onChange={handleOnChange} required className="form-control">
                      <option value=''>Seleccione estado</option>
                      <option value='Activo'>Activo</option>
                      <option value='Inactivo'>Inactivo</option>
                    </select>
                </div>
            </div>
            
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Creacion</label>
                <input type="date" name='fechaCreacion' 
                  value={fechaCreacion} onChange={handleOnChange}  
                  className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Actualizacion</label>
                <input type="date" name='fechaActualizacion' 
                  value={fechaActualizacion} onChange={handleOnChange} 
                  className="form-control" />
              </div>
            </div>
        <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Slogan</label>
                <input type="text" name='slogan' 
                  value={slogan} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <input type="text" name='descripcion' 
                  value={descripcion} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>

        </div>
          <div className= 'row'>
            <div className= 'col'>
              <button className= "btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
