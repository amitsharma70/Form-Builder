// src/services/authService.js
import axios from 'axios';

const authService = {
  login: async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
    localStorage.setItem('token', response.data.token);
    console.log(response.data);
    
    return response.data;
  },
  register: async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/user/register', { email, password });
    return response.data;
  },
  getToken: () => localStorage.getItem('token'),
  logout: () => localStorage.removeItem('token'),
};

export default authService;