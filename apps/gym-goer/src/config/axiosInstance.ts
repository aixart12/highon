import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://192.168.43.215:3333/api',
});
