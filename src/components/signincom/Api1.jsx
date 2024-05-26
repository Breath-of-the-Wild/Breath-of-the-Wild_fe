import axios from 'axios';

const BASE_URL = 'http://43.200.51.52:8080';

const api1 = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserInfo = async () => {
  try {
    const response = await api.get('/api/user/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/api/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    const { token, refreshToken } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api1;
