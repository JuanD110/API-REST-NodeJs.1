import axios from 'axios';

const axiosInstance = axiosCreate({
    baseUrl: 'http://localhost:4000/'
});

export {
    axiosInstance
}

