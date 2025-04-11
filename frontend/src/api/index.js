import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

export const fetchCsrfToken = async () => {
    try {
        const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        throw error;
    }
};

// Add a request interceptor to handle CSRF token
api.interceptors.request.use(async (config) => {
    if (!config.url.includes('/sanctum/csrf-cookie')) {
        try {
            await fetchCsrfToken();
        } catch (error) {
            console.error('Error in request interceptor:', error);
        }
    }
    return config;
});

export { api };
