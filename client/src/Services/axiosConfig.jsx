// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2001', //  base URL 
  timeout: 10000, // Optional timeout configuration
  headers: {
    // 'Content-Type': 'application/json',
    // You can add any default headers here
  },
});

export default instance;
