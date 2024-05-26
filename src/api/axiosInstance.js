import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URLS } from './apiConfig';

const axiosInstance = axios.create({
  baseURL: API_URLS.INSTANCEAPI,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axiosInstance.post('/auth/refresh');
        const { token } = response.data;

        Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'Strict' });

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers['Authorization'] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Function to refresh token periodically
const refreshAuthToken = async () => {
  try {
    const response = await axiosInstance.post('/auth/refresh');
    const { token } = response.data;

    Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'Strict' });

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.log('Periodic token refresh failed', error);
  }
};

// Refresh token every 10 minutes
setInterval(refreshAuthToken, 10 * 60 * 1000);

export default axiosInstance;
