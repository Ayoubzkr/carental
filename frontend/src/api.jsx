import axios from "axios";




// Fonction pour récupérer le cookie CSRF
export const fetchCsrfToken = async () => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
        baseURL: 'http://localhost:8000' // Spécifiez le baseURL ici
        
    });
};

// Instance principale pour les requêtes API
export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// api.jsx
api.interceptors.request.use(async (config) => {
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await fetchCsrfToken();
    }

    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    config.headers['X-XSRF-TOKEN'] = csrfToken || '';

    return config;
});
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // Obligatoire pour Sanctum !
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios;
