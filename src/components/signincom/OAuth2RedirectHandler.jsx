import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      window.location.href = '/'; // 리디렉션할 경로
    }
  }, [location]);

  return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
