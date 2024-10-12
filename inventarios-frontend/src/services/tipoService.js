import { axiosInstance } from "../helper/axios-config";

const getTipo = () => {
    return axiosInstance.get('tipo', { //http://localhost4000/tipo
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const crearTipo = (data) => {
    return axiosInstance.post('tipo', data, { //http://localhost4000/tipo
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const actualizarTipo = (tipoId, data) => {
    return axiosInstance.put(`tipo/${tipoId}`, data,{
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const eliminarTipo = (tipoId) => {
    return axiosInstance.delete(`tipo/${tipoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export { actualizarTipo, crearTipo, getTipo, eliminarTipo };
