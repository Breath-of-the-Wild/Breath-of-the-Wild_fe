import React, { useState } from 'react';
import axios from 'axios';
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


const SignUpExam = () => {

  const [signUpData, setSignUpData] = useState({ 
    id: '', 
    password: '',
    username: '',
    birth: '' 
  });


  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('http://localhost:8080/auth/signUp', signUpData);
      console.log(response.data); // 회원가입 결과 출력
      alert("회원가입 성공");
      // 대시보드로 이동
      window.location.href = "/signin";
    } catch (error) {
      console.error('Sign Up Error:', error);
      alert("회원가입 실패");
    }
  };

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;

      setSignUpData({ ...signUpData, [name]: value });
 
  };

  return (
    <div className="w-2/5 lg:w-1/3 my-10 m-auto rounded-md shadow-md p-5">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">회원가입</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">  </Typography>
          </div>
          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignUp}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                이메일
              </Typography>
              <Input
                type="email"
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="id"
                value={signUpData.id}
                onChange={(e) => handleInputChange(e, 'signUp')}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                패스워드
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="password"
                value={signUpData.password}
                onChange={(e) => handleInputChange(e, 'signUp')}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
               <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                패스워드 확인
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="password2" 
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                닉네임
              </Typography>
              <Input
                type="text"
                size="lg"
                placeholder="닉네임"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="username"
                value={signUpData.username}
                onChange={(e) => handleInputChange(e, 'signUp')}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                생일
              </Typography>
              <Input
                type="date"
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                name="birth"
                value={signUpData.birth}
                onChange={(e) => handleInputChange(e, 'signUp')}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />


            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  개인정보 조회 동의
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />

            <Button className="mt-6" type="submit" fullWidth>
              회원가입
            </Button>


            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              이미 계정이 있으신가요?
              <Link to="/SignIn" className="text-gray-900 ml-1">로그인 하러가기</Link>
            </Typography>
          </form>
        </div>

  );
};

export default SignUpExam;
