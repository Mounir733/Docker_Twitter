import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // remplacer par l'URL de votre API Express
});

export default api;