import axios from 'axios';
import { apiUrlBackend } from '../constants.js';

export const login = async (postData) => {
    const response = await axios.post(`${apiUrlBackend}/login`, postData);
    return response.data;
}

export const register = async (postData) => {
    const response = await axios.post(`${apiUrlBackend}/customers`, postData);
    return response.data;
}