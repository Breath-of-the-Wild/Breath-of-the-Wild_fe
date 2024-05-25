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
      localStorage.setItem('username', name);
      localStorage.setItem('id', email);

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