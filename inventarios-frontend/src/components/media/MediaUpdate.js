import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDirectores } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { actualizarMedia, getMediaPorId, eliminarMedia, getMedia} from '../../services/mediaService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';

export const MediaUpdate = () => {
    const { mediaId = '' } = useParams();
    const [media, setMedia] = useState();
    const [directores, setDirectores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [valoresForm, setValoresForm] = useState({});

    const { serial = '', titulo = '', sinopsis = '', url = '', imagenPortada = '',
        añoEstreno = '', fechaCreacion = '', fechaActualizacion = '', generoPrincipal, directorPrincipal, productora, tipo } = valoresForm;

    useEffect(() => {
        const listarDirectores = async () => {
            try {
                const { data } = await getDirectores();
                setDirectores(data);
            } catch (error) {
                console.log(error);
            }
        };

        listarDirectores();
    }, []);

    useEffect(() => {
        const listarProductoras = async () => {
            try {
                const { data } = await getProductora();
                setProductoras(data);
            } catch (error) {
                console.log(error);
            }
        };

        listarProductoras();
    }, []);

    useEffect(() => {
        const listarTipos = async () => {
            try {
                const { data } = await getTipo();
                setTipos(data);
            } catch (error) {
                console.log(error);
            }
        };

        listarTipos();
    }, []);

    useEffect(() => {
        const listarGeneros = async () => {
            try {
                const { data } = await getGeneros();
                setGeneros(data);
            } catch (error) {
                console.log(error);
            }
        };

        listarGeneros();
    }, []);

    useEffect(() => {
        const getMedia = async () => {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Cargando...'
                });
                Swal.showLoading();
                const { data } = await getMediaPorId(mediaId);
                setMedia(data);
                Swal.close();
            } catch (error) {
                console.log(error);
                Swal.close();
            }
        };

        getMedia();
    }, [mediaId]);

    useEffect(() => {
        if (media) {
            setValoresForm({
                serial: media.serial,
                titulo: media.titulo,
                sinopsis: media.sinopsis,
                url: media.url,
                imagenPortada: media.imagenPortada,
                fechaCreacion: media.fechaCreacion,
                fechaActualizacion: media.fechaActualizacion,
                añoEstreno: media.añoEstreno,
                generoPrincipal: media.generoPrincipal,
                directorPrincipal: media.directorPrincipal,
                productora: media.productora,
                tipo: media.tipo
            });
        }
    }, [media]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        const mediaData = {
            serial, titulo, sinopsis, url, imagenPortada, añoEstreno, generoPrincipal,
            directorPrincipal, productora, tipo
        };
        
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            await actualizarMedia(mediaId, mediaData);
            Swal.fire('Actualizado!', 'La media ha sido actualizada.', 'success');
        } catch (error) {
            console.log(error);
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = "Ocurrió un error, por favor intente de nuevo";
            }
            Swal.fire('Error', mensaje, 'error');
        }
    };

    const listarMedia = async () => {
        try {
            // Cargar los medios sin mostrar una ventana modal
            const { data } = await getMedia();
            console.log(data);
            setMedia(data);
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Ocurrió un error al listar los medios.', 'error');
        }
    };

    const handleEliminarMedia = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Eliminando...',
                });
                Swal.showLoading();

                await eliminarMedia(mediaId);


                Swal.close();
                Swal.fire('Eliminado!', 'La media ha sido eliminada.', 'success');
                await listarMedia();

            } catch (error) {
                Swal.close();
                let mensaje;
                if (error && error.response && error.response.data) {
                    mensaje = error.response.data;
                } else {
                    mensaje = "Ocurrió un error, por favor intente de nuevo";
                }
                Swal.fire('Error', mensaje, 'error');
            }
        }
    };

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Actualizar Media</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4 d-flex align-items-center justify-content-center'>
                            <img src={media?.imagenPortada} alt="Imagen Portada" className="img-fluid" style={{ maxHeight: '400px', objectFit: 'cover' }} />
                        </div>
                        <div className='col-md-8'>
                            <form onSubmit={handleOnSubmit}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text" name='serial'
                                                value={serial}
                                                onChange={handleOnChange}
                                                required
                                                className='form-control' />
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
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Url</label>
                                            <input type="text" name='url'
                                                value={url} onChange={handleOnChange} required
                                                className="form-control" />
                                        </div>
                                    </div>
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
                                            <label className="form-label">Fecha Creación</label>
                                            <input type="text" name='fechaCreacion'
                                                value={fechaCreacion} onChange={handleOnChange} required
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Actualización</label>
                                            <input type="text" name='fechaActualizacion'
                                                value={fechaActualizacion} onChange={handleOnChange} required
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Género Principal</label>
                                            <select name='generoPrincipal'
                                                value={generoPrincipal} onChange={handleOnChange} required
                                                className="form-select">
                                                {generos.map((genero) => (
                                                    <option key={genero._id} value={genero._id}>{genero.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Director Principal</label>
                                            <select name='directorPrincipal'
                                                value={directorPrincipal} onChange={handleOnChange} required
                                                className="form-select">
                                                {directores.map((director) => (
                                                    <option key={director._id} value={director._id}>{director.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Productora</label>
                                            <select name='productora'
                                                value={productora} onChange={handleOnChange} required
                                                className="form-select">
                                                {productoras.map((productora) => (
                                                    <option key={productora._id} value={productora._id}>{productora.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Tipo</label>
                                            <select name='tipo'
                                                value={tipo} onChange={handleOnChange} required
                                                className="form-select">
                                                {tipos.map((tipo) => (
                                                    <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">Actualizar</button>
                                <button type="button" className="btn btn-danger ms-2" onClick={handleEliminarMedia}>Eliminar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
