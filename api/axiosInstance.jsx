
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://103.200.20.87:8080/api/',
    timeout: 10000,
});


api.interceptors.request.use(
    (config) => {

        const token = AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {

        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized: Token expired or invalid');
        }

        return Promise.reject(error);
    }
);

export default api;
