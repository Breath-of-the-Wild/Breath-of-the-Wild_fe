import React from 'react';

const BASE_URL = 'http://43.200.51.52:8080';

const OAuth2LoginButton = ({ provider, providerName }) => {
  const handleLogin = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <button onClick={handleLogin}>
      {providerName} 로그인
    </button>
  );
};

const Login = () => {
  return (
    <div>
      <h2>로그인</h2>
      <OAuth2LoginButton provider="google" providerName="Google" />
      <OAuth2LoginButton provider="kakao" providerName="Kakao" />
      <OAuth2LoginButton provider="naver" providerName="Naver" />
    </div>
  );
};

export default Login;
