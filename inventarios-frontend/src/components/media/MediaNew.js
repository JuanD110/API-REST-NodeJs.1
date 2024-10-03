import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getDirectores } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { crearMedia } from '../../services/mediaService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';

export const MediaNew = ({ handleOpenModal, listarMedia }) => {

  const [directores, setDirectores ] = useState([]);
  const [productoras, setProductora ] = useState([]);
  const [generos, setGeneros ] = useState([]);
  const [tipos, setTipo ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState([]);
  const { serial = '', titulo = '',  sinopsis = '', url = '', imagenPortada = '',
      añoEstreno = '', fechaCreacion = '', fechaActualizacion = '', generoPrincipal, directorPrincipal, productora, tipo } = valoresForm
  
const listarDirectores = async () => {
  try{
      const { data } = await getDirectores();
      setDirectores(data);

  } catch(error) {
      console.log(error);
  }
}

useEffect(() => {
  listarDirectores();
}, []);


const listarProductoras = async () => {
  try{
      const { data } = await getProductora();
      setProductora(data);

  } catch(error) {
      console.log(error);
  }
}

useEffect(() => {
  listarProductoras();
}, []);


const listarTipos = async () => {
  try{
      const { data } = await getTipo();
      setTipo(data);

  } catch(error) {
      console.log(error);
  }
}

useEffect(() => {
  listarTipos();
}, []);


const listarGeneros = async () => {
  try{
      const { data } = await getGeneros();
      setGeneros(data);

  } catch(error) {
      console.log(error);
  }
}

useEffect(() => {
  listarGeneros();
}, []);

  
  const handleOnChange = ({ target }) => {
      const { name, value } = target;
      setValoresForm({ ...valoresForm, [name]: value });
  }

  const handleOnSubmit = async (e) => {
      e.preventDefault();
      const media = {
          serial, titulo, sinopsis, url, imagenPortada, añoEstreno, generoPrincipal,
          directorPrincipal, productora, tipo
      }
      console.log(media);
      try {
          Swal.fire({
              allowOutsideClick: false,
              text: 'Cargando...'
          });
          Swal.showLoading();
          const { data } = await crearMedia(media);
          handleOpenModal();
          listarMedia();
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
              <h3>Nueva Media</h3>
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
                <label className="form-label">Serial</label>
                <input type="text" name='serial' 
                  value={serial} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Titulo</label>
                <input type="text" name='titulo'
                  value={titulo} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <input type="text" name='sinopsis' 
                  value={sinopsis} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Url</label>
                <input type="text" name='url' 
                  value={url} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Imagen Portada</label>
                <input type="text" name='imagenPortada' 
                  value={imagenPortada} onChange={handleOnChange} required 
                  className="form-control" />
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
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año Estreno</label>
                <input type="number" name='añoEstreno' 
                  value={añoEstreno} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Genero Principal</label>
                <select className="form-select"
                  required name='generoPrincipal'
                  value={generoPrincipal} onChange={handleOnChange}>
                  <option value="">---SELECCIONE---</option>
                  {
                    generos.map(({ _id, nombres }) => {
                      return <option key={_id} value={_id}>{nombres}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director Principal</label>
                <select className="form-select"
                  required name='directorPrincipal'
                  value={directorPrincipal} onChange={handleOnChange}>
                  <option value="">---SELECCIONE---</option>
                  {
                    directores.map(({ _id, nombres }) => {
                      return <option key={_id} value={_id}>{nombres}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select className="form-select"
                  required name='productora'
                  value={productora} onChange={handleOnChange}>
                  <option value="">---SELECCIONE---</option>
                  {
                    productoras.map(({ _id, nombres }) => {
                      return <option key={_id} value={_id}>{nombres}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className="form-select"
                  required name='tipo'
                  value={tipo} onChange={handleOnChange}>
                  <option value="">---SELECCIONE---</option>
                  {
                    tipos.map(({ _id, nombres }) => {
                      return <option key={_id} value={_id}>{nombres}</option>
                    })
                  }
                </select>
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
};
