import React, { useEffect, useState } from 'react';
import { getDirectores } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { crearMedia } from '../../services/mediaService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';


export const MediaNew = ({ handleOpenModal, listarMedia }) => {
  
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [valoresForm, setValoresForm] = useState({
    serial: '', titulo: '', sinopsis: '', url: '', imagenPortada: '',
    fechaCreacion: '', fechaActualizacion: '', añoEstreno: '',
    generoPrincipal: '', directorPrincipal: '', productora: '', tipo: ''
  });

  const {
    serial, titulo, sinopsis, url, imagenPortada,
    fechaCreacion, fechaActualizacion, añoEstreno,
    generoPrincipal, directorPrincipal, productora, tipo
  } = valoresForm;

  const listarDirectores = async () => {
    try {
      const { data } = await getDirectores();
      setDirectores(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarGeneros = async () => {
    try {
      const { data } = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarTipo = async () => {
    try {
      const { data } = await getTipo();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarProductora = async () => {
    try {
      const { data } = await getProductora();
      setProductoras(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarDirectores();
    listarGeneros();
    listarTipo();
    listarProductora();
  }, []);

  const handleOnChange =  ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const media = {
      serial,
      titulo,
      sinopsis,
      url,
      imagenPortada,
      fechaCreacion,
      fechaActualizacion,
      añoEstreno,
      generoPrincipal: {
        _id: generoPrincipal 
      },
      directorPrincipal: {
        _id: directorPrincipal 
      },
      productora: {
        _id: productora 
      },
      tipo: {
        _id: tipo 
      }
    };

    try {
      await crearMedia(media);
      console.log("Media guardada correctamente");
      handleOpenModal(); 
    } catch (error) {
      console.log("Error al guardar media", error);
    }
};


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
                  value={fechaCreacion} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Actualizacion</label>
                <input type="date" name='fechaActualizacion' 
                  value={fechaActualizacion} onChange={handleOnChange} required 
                  className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año Estreno</label>
                <input type="text" name='añoEstreno' 
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
              <button type= "button" className= "btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
