import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URLS } from './apiConfig';

const axiosInstance = axios.create({
  baseURL: API_URLS.INSTANCEAPI,
  withCredentials: true,
});

let retryCount = 0; // 401 오류 발생 횟수 추적

axiosInstance.interceptors.response.use(
  (response) => {
    retryCount = 0; // 성공적인 응답이 오면 카운터를 리셋
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (retryCount >= 100) {
        // 100번 이상 발생하면 추가 요청 중단
        console.log('401 오류가 100번 발생하여 추가 요청을 중단합니다.');
        return Promise.reject(error);
      }

      retryCount += 1;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          console.log('리프레시 토큰이 없습니다.');
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_URLS.INSTANCEAPI}/auth/refresh`, {}, {
          headers: { 'Authorization': `Bearer ${refreshToken}` },
          withCredentials: true,
        });

        const { token } = response.data;

        Cookies.set('access_token', token, { expires: 1 / 24, secure: true, sameSite: 'Strict', path: '/' });

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

export default axiosInstance;
