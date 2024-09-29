import { Header } from "../components/ui/header";
import { axiosInstance } from "../helper/axios-config";

const getDirectores = () => {
    return axiosInstance.get('director', { //http://localhost4000/director
        header: {
            'Content-Type': 'application/json'
        }
     });
}

const crearDirector = (data) => {
    return axiosInstance.get('director', { //http://localhost4000/director
        header: {
            'Content-Type': 'application/json'
        }
     });
}

