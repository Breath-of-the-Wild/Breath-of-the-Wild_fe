const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true // GitHub Actions에서 설정한 환경 변수를 사용
    }),
  ],
};
