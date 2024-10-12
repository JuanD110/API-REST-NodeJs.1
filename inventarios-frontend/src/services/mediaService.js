import { axiosInstance } from "../helper/axios-config";

const getMedia = () => {
    return axiosInstance.get('media', { //http://localhost4000/media
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const crearMedia = (data) => {
    return axiosInstance.post('media', data, { //http://localhost4000/media
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const actualizarMedia = (mediaId, data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {

        header: {
            'Content-Type': 'application/json'
        }
    });
}

const getMediaPorId = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}`, {

        header: {
            'Content-Type': 'application/json'
        }
    });
}

const eliminarMedia = (mediaId) => {
    return axiosInstance.delete(`media/${mediaId}`, {

        header: {
            'Content-Type': 'application/json'
        }
    });
}


export { actualizarMedia, crearMedia, getMedia, getMediaPorId, eliminarMedia };

