import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const deleteCookie = (name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const access_token = getCookieValue('access_token');
    const refresh_token = getCookieValue('refresh_token');
    const name = getCookieValue('name');
    const email = getCookieValue('email');

    if (access_token && refresh_token && name && email) {
// 액세스 토큰과 리프레시 토큰의 만료 시간을 설정합니다.
const accessTokenExpiry = new Date(new Date().getTime() + 60 * 60 * 1000); // 1시간 후
  
// 로컬스토리지에 토큰과 만료 시간을 저장합니다.
localStorage.setItem('accessToken', access_token);
localStorage.setItem('accessTokenExpiry', accessTokenExpiry.toISOString());

// 쿠키에 토큰과 만료 시간을 저장합니다.
Cookies.set('access_Token', access_token, { expires: 1 / 24, secure: true, sameSite: 'Strict', path: '/' });
Cookies.set('refresh_Token', refresh_token, { expires: 30, secure: true, sameSite: 'Strict', path: '/' });

      deleteCookie('email');
      deleteCookie('name');
      navigate('/');
    } else {
      console.error('Missing token, refreshToken, name or email in cookies');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuth2Callback;