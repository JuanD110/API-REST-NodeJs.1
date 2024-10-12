import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { actualizarDirector, crearDirector, getDirectores, eliminarDirector } from '../../services/directorService';
const moment = require('moment');


export const DirectorView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [directores, setDirectores] = useState([]);
  const { nombres = '', estado = '', fechaCreacion = '', fechaActualizacion = '' } = valoresForm;
  const [DirectorSeleccionado, setDirectorSeleccionado] = useState(null);



  const listarDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getDirectores();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarDirectores();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }


  const handleCrearDirectores = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
  
      if (DirectorSeleccionado) {
        
        await actualizarDirector(valoresForm, DirectorSeleccionado);
        setDirectorSeleccionado(null); // Resetear
      } else {
        
        await crearDirector(valoresForm);
      }
      
      setValoresForm({ nombres: '', estado: '', fechaCreacion: '', fechaActualizacion: '' });
      listarDirectores();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  

  const handleActualizarDirector = async (e, director) => {
    e.preventDefault();
    setValoresForm({ nombres: director.nombres, estado: director.estado, fechaCreacion: director.fechaCreacion, fechaActualizacion: director.fechaActualizacion });
    setDirectorSeleccionado(director._id); 
  };


  const handleEliminarDirector = async (e, directorId) => {
    e.preventDefault();
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        Swal.fire({
          allowOutsideClick: false,
          text: 'Eliminando...'
        });
        Swal.showLoading();

        await eliminarDirector(directorId); // Llamada para eliminar el director
        listarDirectores(); // Refrescar la lista de directores
        Swal.close();
        Swal.fire(
          'Eliminado!',
          'El director ha sido eliminado.',
          'success'
        );
      } catch (error) {
        console.log(error);
        Swal.close();
      }
    }
  };
  

  return (
    <div className='container-fluid mt-4'>
    <form onSubmit={(e) => handleCrearDirectores(e)} >
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name='nombres' value={nombres} type="text" className="form-control"
              onChange={(e) => handleOnChange(e)} />
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
        
        <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">Fecha Creación</label>
            <input required name='fechaCreacion' value={fechaCreacion} type="date" className="form-control"
              onChange={(e) => handleOnChange(e)} />
          </div>
        </div>
      

      <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">Fecha Actualización</label>
            <input required name='fechaActualizacion' value={fechaActualizacion} type="date" className="form-control"
              onChange={(e) => handleOnChange(e)} />
          </div>
        </div>
      
      </div>
      <button className="btn btn-primary mb-3">Guardar</button>
    </form>

    <table className="table">
      <thead>
        <tr>
          <th scope='row'>#</th>
          <th scope="col">Nombre</th>
          <th scope='col'>Estado</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          
        </tr>
      </thead>
      <tbody>
        {
          directores.length > 0 && directores.map((directores, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{directores.nombres}</td>
              <td>{directores.estado}</td>
              <td>{moment(directores.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(directores.fechaActualizacionechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarDirector(e, directores)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={(e) => handleEliminarDirector(e, directores._id)}>Eliminar</button>
                </td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
  )
}

  
