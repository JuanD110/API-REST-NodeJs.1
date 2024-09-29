import React, { useEffect, useState } from 'react';
import { getDirectores } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';

export const MediaNew = ({ handleOpenModal }) => {
  
  const [generos, setGeneros ] = useState([]);
  const [directores, setDirectores ] = useState([]);
  const [Productoras, setProductoras ] = useState([]);
  const [tipos, setTipos ] = useState([]);
  const [valoresForm, setValoresForm ] = useState([]);
  const {serial = '', titulo = '', sinopsis = '', url = '', imagenPortada = '',
    fechaCreacion = '', fechaActualizacion = '', añoEstreno = '', 
    generoPrincipal, directorPrincipal, productora, tipo 
  } = valoresForm

  const listarDirectores = async () => {
    try{
        const { data } = await getDirectores();
        setDirectores(data);

    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
      listarDirectores();
  
}, []);
  
const listarGeneros = async () => {
  try{
      const { data } = await getGeneros();
      setGeneros(data);

  } catch(error){
    console.log(error);
  }
}

useEffect(() => {
    listarGeneros();

}, []);

const listarTipo = async () => {
  try{
      const { data } = await getTipo();
      setTipos(data);

  } catch(error){
    console.log(error);
  }
}

useEffect(() => {
    listarTipo();

}, []);

const listarProductora = async () => {
  try{
      const { data } = await getProductora();
      setProductoras(data);

  } catch(error){
    console.log(error);
  }
}

useEffect(() => {
    listarProductora();

}, []);

const handleOnChange = ({ target }) => {
  const { name, value } = target;
  setValoresForm({...valoresForm, [name]: value });
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

        <form>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name='serial' 
                value = {serial}
                onChange={ e => handleOnChange(e)}
                required 
                className="form-control"   />

              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Titulo</label>
                <input type="text" name='titulo'
                value = {titulo}
                onChange={ e => handleOnChange(e)} 
                required 
                className="form-control"  />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <input type="text" name='sinopsis' 
                value = {sinopsis}
                onChange={ e => handleOnChange(e)}
                required 
                className="form-control"  />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Url</label>
                <input type="text" name='url' 
                value = {url}
                onChange={ e => handleOnChange(e)}
                required 
                className="form-control"  />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Imagen Portada</label>
                <input type="text" name='imagenPortada' 
                value = {imagenPortada}
                onChange={ e => handleOnChange(e)}
                required 
                className="form-control"  />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Creacion</label>
                <input type="date" name='fechaCreacion' 
                value = {fechaCreacion}
                onChange={ e => handleOnChange(e)}
                required 
                className="form-control"  />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha Actualizacion</label>
                <input type="date" name='fechaActualizacion' 
                value = {fechaActualizacion}
                onChange={ e => handleOnChange(e)}
                required 
                className="form-control"  />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año Estreno</label>
                <input type="text" name='añoEstreno' 
                value = {añoEstreno}
                onChange={ e => handleOnChange(e)}
                required 
                className="form-control"  />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Genero Principal</label>
                <select class="form-select"
                required
                name= 'generoPrincipal'
                value = {generoPrincipal}
                onChange={ e => handleOnChange(e)}>
                <option value = "">---SELECCIONE---</option>
                  {
                    generoPrincipal.map(({_id, nombres}) =>{
                      return <option key={_id}>{nombres}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director Principal</label>
                <select class="form-select"
                required
                name= 'directorPrincipal'
                value = {directorPrincipal}
                onChange={ e => handleOnChange(e)}>
                <option value = "">---SELECCIONE---</option>
                  {
                    directorPrincipal.map(({_id, nombres}) =>{
                      return <option key={_id}>{nombres}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select class="form-select"
                required
                name= 'productora'
                value = {productora}
                onChange={ e => handleOnChange(e)}>
                <option value = "">---SELECCIONE---</option>
                  {
                    productora.map(({_id, nombres}) =>{
                      return <option key={_id}>{nombres}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select class="form-select"
                required
                name= 'tipo'
                value = {tipo}
                onChange={ e => handleOnChange(e)}>
                <option value = "">---SELECCIONE---</option>
                  {
                    tipos.map(({_id, nombres}) =>{
                      return <option key={_id}>{nombres}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


