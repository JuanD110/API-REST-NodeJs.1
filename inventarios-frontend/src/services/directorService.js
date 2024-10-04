import { axiosInstance } from "../helper/axios-config";

const getDirectores = () => {
    return axiosInstance.get('director', { //http://localhost4000/director
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

export { actualizarDirector, crearDirector, getDirectores };

