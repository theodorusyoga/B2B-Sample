import axios from 'axios';

const API_URL = process.env.API_URL;

export const login = payload => axios.post(`${API_URL}/login/`, payload);

export const signup = payload => axios.post(`${API_URL}/signup/`, payload);

export const getStores = params => axios.get(`${API_URL}/stores`, { params });

export const getStoreDetails = (id, params) => axios.get(`${API_URL}/stores/${id}`, { params });
