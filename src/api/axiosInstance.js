import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URLS } from './apiConfig';

const axiosInstance = axios.create({
  baseURL: API_URLS.INSTANCEAPI,
  withCredentials: true, // 쿠키를 포함하여 요청을 보냅니다.
});

let retryCount = 0; // 401 오류 발생 횟수를 추적합니다.

axiosInstance.interceptors.response.use(
  (response) => {
    retryCount = 0; // 성공적인 응답이 오면 카운터를 리셋합니다.
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (retryCount >= 5) {
        console.log('401 오류가 5번 발생하여 추가 요청을 중단합니다.');
        return Promise.reject(error);
      }

      retryCount += 1;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          console.log('리프레시 토큰이 없습니다.');
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_URLS.INSTANCEAPI}/auth/refresh`, {}, {
          headers: { 'Authorization': `Bearer ${refreshToken}` },
          withCredentials: true,
        });

        const { token: newAccessToken } = response.data;

        // 새로운 액세스 토큰을 로컬스토리지와 쿠키에 저장합니다.
        localStorage.setItem('accessToken', newAccessToken);
        const accessTokenExpiry = new Date(new Date().getTime() + 60 * 60 * 1000); // 1시간 후
        localStorage.setItem('accessTokenExpiry', accessTokenExpiry.toISOString());

        Cookies.set('accessToken', newAccessToken, { expires: 1 / 24, secure: true, sameSite: 'Strict', path: '/' });
        Cookies.set('accessTokenExpiry', accessTokenExpiry.toISOString(), { expires: 1 / 24, secure: true, sameSite: 'Strict', path: '/' });

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 액세스 토큰 만료 시간에 맞춰 토큰을 제거하는 타이머를 설정합니다.
        const expiresIn = accessTokenExpiry.getTime() - new Date().getTime();
        setTimeout(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('accessTokenExpiry');
          Cookies.remove('accessToken');
          Cookies.remove('accessTokenExpiry');
          console.log('Access token expired and removed');
        }, expiresIn);

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
