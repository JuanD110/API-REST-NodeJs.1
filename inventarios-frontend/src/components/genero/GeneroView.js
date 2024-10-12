import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { actualizarGenero, crearGenero, getGeneros, eliminarGenero } from '../../services/generoService';
const moment = require('moment');


export const GeneroView = () => {

  const [valoresForm, setValoresForm] = useState({});
  const [generos, setGeneros] = useState([]);
  const { nombres = '', estado = '', fechaCreacion = '', fechaActualizacion = '', descripcion = '' } = valoresForm;
  const [GeneroSeleccionado, setGeneroSeleccionado] = useState(null);



  const listarGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await getGeneros();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarGeneros();
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }


  const handleCrearGeneros = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
  
      if (GeneroSeleccionado) {
        
        await actualizarGenero(valoresForm, GeneroSeleccionado);
        setGeneroSeleccionado(null); // Resetear
      } else {
        
        await crearGenero(valoresForm);
      }
      
      setValoresForm({ nombres: '', estado: '', fechaCreacion: '', fechaActualizacion: '', descripcion: '' });
      listarGeneros();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  

  const handleActualizarGenero = async (e, generos) => {
    e.preventDefault();
    setValoresForm({ nombres: generos.nombres, estado: generos.estado, fechaCreacion: generos.fechaCreacion, fechaActualizacion: generos.fechaActualizacion,
      descripcion: generos.descripcion
     });
    setGeneroSeleccionado(generos._id); 
  };


  const handleEliminarGenero = async (e, generoId) => {
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

        await eliminarGenero(generoId); // Llamada para eliminar el genero
        listarGeneros(); // Refrescar la lista de generos
        Swal.close();
        Swal.fire(
          'Eliminado!',
          'El genero ha sido eliminado.',
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
    <form onSubmit={(e) => handleCrearGeneros(e)} >
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
          <th scope='col'>Estado</th>
          <th scope='col'>Fecha Creación</th>
          <th scope='col'>Fecha Actualización</th>
          <th scope='col'>Descripción</th>
          
        </tr>
      </thead>
      <tbody>
        {
          generos.length > 0 && generos.map((generos, index) => {
            return <tr>
              <th scope='row'> {index + 1}</th>
              <td>{generos.nombres}</td>
              <td>{generos.estado}</td>
              <td>{moment(generos.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(generos.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{generos.descripcion}</td>
              <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleActualizarGenero(e, generos)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm' onClick={(e) => handleEliminarGenero(e, generos._id)}>Eliminar</button>
                </td>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
  )
}

