import { axiosInstance } from "../helper/axios-config";

const getProductora = () => {
    return axiosInstance.get('productora', { //http://localhost4000/productora
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const crearProductora = (data) => {
    return axiosInstance.post('productora', { //http://localhost4000/productora
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const actualizarProductora = (productoraId, data) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

export { actualizarProductora, crearProductora, getProductora };
