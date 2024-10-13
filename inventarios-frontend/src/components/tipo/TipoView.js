import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { actualizarTipo, crearTipo, eliminarTipo, getTipo } from '../../services/tipoService';
const moment = require('moment');

export const TipoView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [tipos, setTipos] = useState([]);
  const { nombres = '', fechaCreacion = '', fechaActualizacion = '', descripcion = '' } = valoresForm;
  const [TipoSeleccionado, setTipoSeleccionado] = useState(null);



  const listarTipos = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getTipo();
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarTipos();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }


  const handleCrearTipo = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
  
      if (TipoSeleccionado) {
        
        await actualizarTipo(valoresForm, TipoSeleccionado);
        setTipoSeleccionado(null); // Resetear
      } else {
        
        await crearTipo(valoresForm);
      }
      
      setValoresForm({ nombres: '', fechaCreacion: '', fechaActualizacion: '', descripcion: '' });
      listarTipos();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  

  const handleActualizarTipo = async (e, tipo) => {
    e.preventDefault();
    setValoresForm({ nombres: tipo.nombres, fechaCreacion: tipo.fechaCreacion, fechaActualizacion: tipo.fechaActualizacion, descripcion: tipo.descripcion });
    setTipoSeleccionado(tipo._id); 
  };


  const handleEliminarTipo = async (e, tipoId) => {
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

        await eliminarTipo(tipoId); // Llamada para eliminar el tipo
        listarTipos(); // Refrescar la lista de tipos
        Swal.close();
        Swal.fire(
          'Eliminado!',
          'El tipo ha sido eliminado.',
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
    <form onSubmit={(e) => handleCrearTipo(e)} >
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name='nombres' value={nombres} type="text" className="form-control"
              onChange={(e) => handleOnChange(e)} />
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
      

        <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">Descripcion</label>
            <input required name='descripcion' value={descripcion} type="text" className="form-control"
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
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          <th scope='col'>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        {
          tipos.length > 0 && tipos.map((tipo, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{tipo.nombres}</td>
              <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(tipo.fechaActualizacionechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{tipo.descripcion}</td>
              <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarTipo(e, tipo)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={(e) => handleEliminarTipo(e, tipo._id)}>Eliminar</button>
                </td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
  )
}


