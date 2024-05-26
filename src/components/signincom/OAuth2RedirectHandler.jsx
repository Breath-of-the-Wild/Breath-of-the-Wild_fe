import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        try {
          const response = await axios.get(`http://43.200.51.52:8080/api/oauth2/login/kakao?code=${code}`);
          const { token, refreshToken, username } = response.data;

          // Store tokens in cookies
          Cookies.set('access_token', token, { expires: 1 / 24 }); // 1 hour expiry
          Cookies.set('refresh_token', refreshToken, { expires: 30 }); // 30 days expiry

          localStorage.setItem('username', username);

          navigate('/'); // Redirect to home or dashboard after successful login
        } catch (error) {
          console.error('Failed to fetch token:', error);
          navigate('/login'); // Redirect to login on failure
        }
      } else {
        navigate('/login'); // Redirect to login if no code is present
      }
    };

    fetchToken();
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
