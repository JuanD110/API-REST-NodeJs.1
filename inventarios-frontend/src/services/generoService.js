import { axiosInstance } from "../helper/axios-config";

const getGeneros = () => {
    return axiosInstance.get('generos', { //http://localhost4000/genero
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const getGeneroPorId = (generoId) => {
    return axiosInstance.get(`generos/${generoId}`, {

        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearGenero = (data) => {
    return axiosInstance.post('generos', data, { //http://localhost4000/genero
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const actualizarGenero = (generoId, data) => {
    return axiosInstance.put(`generos/${generoId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}


const eliminarGenero = (generoId) => {
    return axiosInstance.delete(`generos/${generoId}`)
        .then(response => {
            console.log('Género eliminado:', response.data);
            return response.data; // Devuelve la respuesta, si es necesario
        })
        .catch(error => {
            console.error('Error al eliminar el género:', error.response || error);
            throw error; // Lanza el error para que pueda ser manejado por el componente
        });
};


export { actualizarGenero, crearGenero, getGeneros, eliminarGenero };
