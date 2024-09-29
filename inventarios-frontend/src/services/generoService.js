import { axiosInstance } from "../helper/axios-config";

const getGeneros = () => {
    return axiosInstance.get('generos', { //http://localhost4000/genero
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const crearGenero = (data) => {
    return axiosInstance.post('generos', { //http://localhost4000/genero
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const actualizarGenero = (generoId, data) => {
    return axiosInstance.put(`genero/${generoId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

export { actualizarGenero, crearGenero, getGeneros };
