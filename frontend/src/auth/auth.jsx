import axios from 'axios';

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

export const loginUser = async (credentials) => {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    const response = await axios.post('http://localhost:8000/api/login', credentials);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.error("Erreur de connexion :", error);
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};
