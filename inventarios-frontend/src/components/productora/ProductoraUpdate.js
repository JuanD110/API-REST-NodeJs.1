import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearProductora, actualizarProductora, eliminarProductora, getProductora, getProductoraPorId } from '../../services/productoraService';

export const ProductoraUpdate = () => {
    const { productoraId = '' } = useParams();
    
    const [productora, setProductora] = useState();
    const [valoresForm, setValoresForm] = useState({});

  const { nombres = '', estado = '',  fechaCreacion = '',
       fechaActualizacion = '', slogan = '', descripcion = '' } = valoresForm

    useEffect(() => {
        const listarProductoras = async () => {
            try {
                const { data } = await getProductora();
                setProductora(data);
            } catch (error) {
                console.log(error);
            }
        };

        listarProductoras();
    }, []);

    

    useEffect(() => {
        const getProductora = async () => {
            try {
                Swal.fire({
                    allowOutsideClick: false,
                    text: 'Cargando...'
                });
                Swal.showLoading();
                const { data } = await getProductoraPorId(productoraId);
                setProductora(data);
                Swal.close();
            } catch (error) {
                console.log(error);
                Swal.close();
            }
        };

        getProductora();
    }, [productoraId]);

    useEffect(() => {
        if (productora) {
            setValoresForm({
                nombres: productora.nombres,
                estado: productora.estado,
                fechaCreacion: productora.fechaCreacion,
                fechaActualizacion: productora.fechaActualizacion,
                slogan: productora.slogan,
                descripcion: productora.descripcion
            });
        }
    }, [productora]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        const productoraData = {
            nombres, estado, fechaCreacion, fechaActualizacion, slogan, descripcion
        };
        
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            await actualizarProductora(productoraId, productoraData);
            Swal.fire('Actualizado!', 'La productora ha sido actualizada.', 'success');
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

    const listarProductoras = async () => {
        try {
            // Cargar las productoras
            const { data } = await getProductora();
            console.log(data);
            setProductora(data);
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Ocurrió un error al listar las productoras.', 'error');
        }
    };

    const handleEliminarProductora = async () => {
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

                await eliminarProductora(productoraId);


                Swal.close();
                Swal.fire('Eliminado!', 'La productora ha sido eliminada.', 'success');
                await listarProductoras();

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
                    <h5 className='card-title'>Actualizar Productora</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4 d-flex align-items-center justify-content-center'>
                            <img src={productora?.slogan} alt="slogan" className="img-fluid" style={{ maxHeight: '400px', objectFit: 'cover' }} />
                        </div>
                        <div className='col-md-8'>
                            <form onSubmit={handleOnSubmit}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Nombres</label>
                                            <input type="text" name='nombres'
                                                value={nombres}
                                                onChange={handleOnChange}
                                                required
                                                className='form-control' />
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
                                            <label className="form-label">fecha Creacion</label>
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
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descripcion</label>
                                            <input type="text" name='descripcion'
                                                value={descripcion} onChange={handleOnChange} required
                                                className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                    

                                <button type="submit" className="btn btn-primary">Actualizar</button>
                                <button type="button" className="btn btn-danger ms-2" onClick={handleEliminarProductora}>Eliminar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};