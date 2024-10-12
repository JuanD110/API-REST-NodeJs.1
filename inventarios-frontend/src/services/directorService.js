import { axiosInstance } from "../helper/axios-config";

const getDirectores = () => {
    return axiosInstance.get('director', { //http://localhost4000/director
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const getDirectorPorId = (directorId) => {
    return axiosInstance.get(`media/${directorId}`, {

        header: {
            'Content-Type': 'application/json'
        }
    });
}
const crearDirector = (data) => {
    return axiosInstance.post('director', data, { //http://localhost4000/director
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const actualizarDirector = (directorId, data) => {
    return axiosInstance.put(`director/${directorId}`, data,{
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const eliminarDirector = (directorId) => {
    return axiosInstance.delete(`director/${directorId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export { actualizarDirector, crearDirector, getDirectores, eliminarDirector };

