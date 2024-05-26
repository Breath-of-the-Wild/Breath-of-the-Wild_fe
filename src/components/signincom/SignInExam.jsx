import React, { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';  // 수정된 부분
import Cookies from 'js-cookie'; // 쿠키 설정을 위해 추가

import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { API_URLS } from '@/api/apiConfig';

const SignInexam = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [saveId, setSaveId] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("saved_id");
    if (savedId) {
      setId(savedId);
      setSaveId(true);
    }
  }, []);

  const changeId = (event) => {
    setId(event.target.value);
  }

  const changePwd = (event) => {
    setPwd(event.target.value);
  }

  const toggleSaveId = (event) => {
    setSaveId(event.target.checked);
  }

  const login = async () => {
    const req = {
      email: id,
      password: pwd
    }

    await axiosInstance.post("/member/login", req)
      .then((resp) => {
        console.log("[Login.js] login() success :D");
        console.log(resp.data);

        alert(resp.data.username + "님, 성공적으로 로그인 되었습니다 🔐");

        const accessToken = resp.data.access_token;
        const refreshToken = resp.data.refresh_token;

        // Set access token to expire in 1 hour
        Cookies.set('access_token', accessToken, { expires: 1 / 24, secure: true, sameSite: 'Strict', path: '/' });
        // Set refresh token to expire in 30 days
        Cookies.set('refresh_token', refreshToken, { expires: 30, secure: true, sameSite: 'Strict', path: '/' });

        // Store tokens in localStorage
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        localStorage.setItem("id", resp.data.email);
        localStorage.setItem("username", resp.data.username);

        if (saveId) {
          localStorage.setItem("saved_id", id);
        } else {
          localStorage.removeItem("saved_id");
        }

        navigate("/");
      }).catch((err) => {
        console.log("[Login.js] login() error :<");
        console.log(err);

        alert("⚠️ " + err.response.data);
      });
  }

  // const onNaverLogin = () => {
  //   window.location.href = "http://localhost:8080/oauth2/authorization/naver"
  // }

  const onGoogleLogin = () => {
    window.location.href = API_URLS.GOOGLE_LOGIN
  }

  // const onKakaoLogin = () => {
  //   window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
  // }
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-6xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-5 pr-5 pb-5 pl-5 bg-white shadow-2xl rounded-xl relative z-10">
              <Typography variant="h2" className="font-bold mb-2 mt-4">로그인</Typography>
              <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">이메일과 패스워드를 입력해주세요</Typography>
              <div className="w-full mr-0 mb-0 ml-0 relative space-y-4">
                <div className="text-center relative">
                  <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">  </Typography>
                </div>

                <div className="mb-1 flex flex-col gap-4 relative">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    이메일
                  </Typography>
                  <Input
                    type="email"
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="id"
                    value={id}
                    onChange={changeId}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <div className="mb-1 flex flex-col gap-4 relative">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    패스워드
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    name="password"
                    value={pwd}
                    onChange={changePwd}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="mb-1 flex flex-col gap-0 mt-0 relative">
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center justify-start font-medium"
                      >
                        아이디 저장
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                    checked={saveId}
                    onChange={toggleSaveId}
                  />
                  <Typography variant="small" className="font-medium text-gray-900">
                    <a href="#"></a>
                  </Typography>
                </div>

                {/* 버튼 */}
                <div className="mb-1 flex flex-col gap-4 relative">
                  <Button size="lg" className="mt-0" onClick={login} fullWidth>
                    로그인
                  </Button>
                </div>

                <div className="mb-1 flex flex-col gap-4 relative">
                  <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth onClick={onGoogleLogin}>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1156_824)">
                        <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                        <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                        <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                        <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1156_824">
                          <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>구글 계정으로 로그인</span>
                  </Button>
                </div>
                <div className="mb-1 flex flex-col gap-4 relative">
                  <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                    아이디가 없으신가요?
                    <Link to="/SignUp" className="text-gray-900 ml-1">회원가입</Link>
                  </Typography>
                </div>
              </div>
            </div>

            <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="2.927" r="2.72" />
                      <circle cx="15.296" cy="2.927" r="2.719" />
                      <circle cx="27.333" cy="2.927" r="2.72" />
                      <circle cx="39.369" cy="2.927" r="2.72" />
                      <circle cx="51.405" cy="2.927" r="2.72" />
                      <circle cx="63.441" cy="2.927" r="2.72" />
                      <circle cx="75.479" cy="2.927" r="2.72" />
                      <circle cx="87.514" cy="2.927" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-green-400 fill-current">
              <g stroke="none" strokeWidth="1" fillRule="evenodd">
                <g fillRule="nonzero">
                  <g>
                    <g>
                      <circle cx="3.261" cy="3.445" r="2.72" />
                      <circle cx="15.296" cy="3.445" r="2.719" />
                      <circle cx="27.333" cy="3.445" r="2.72" />
                      <circle cx="39.369" cy="3.445" r="2.72" />
                      <circle cx="51.405" cy="3.445" r="2.72" />
                      <circle cx="63.441" cy="3.445" r="2.72" />
                      <circle cx="75.479" cy="3.445" r="2.72" />
                      <circle cx="87.514" cy="3.445" r="2.719" />
                    </g>
                    <g transform="translate(0 12)">
                      <circle cx="3.261" cy="3.525" r="2.72" />
                      <circle cx="15.296" cy="3.525" r="2.719" />
                      <circle cx="27.333" cy="3.525" r="2.72" />
                      <circle cx="39.369" cy="3.525" r="2.72" />
                      <circle cx="51.405" cy="3.525" r="2.72" />
                      <circle cx="63.441" cy="3.525" r="2.72" />
                      <circle cx="75.479" cy="3.525" r="2.72" />
                      <circle cx="87.514" cy="3.525" r="2.719" />
                    </g>
                    <g transform="translate(0 24)">
                      <circle cx="3.261" cy="3.605" r="2.72" />
                      <circle cx="15.296" cy="3.605" r="2.719" />
                      <circle cx="27.333" cy="3.605" r="2.72" />
                      <circle cx="39.369" cy="3.605" r="2.72" />
                      <circle cx="51.405" cy="3.605" r="2.72" />
                      <circle cx="63.441" cy="3.605" r="2.72" />
                      <circle cx="75.479" cy="3.605" r="2.72" />
                      <circle cx="87.514" cy="3.605" r="2.719" />
                    </g>
                    <g transform="translate(0 36)">
                      <circle cx="3.261" cy="3.686" r="2.72" />
                      <circle cx="15.296" cy="3.686" r="2.719" />
                      <circle cx="27.333" cy="3.686" r="2.72" />
                      <circle cx="39.369" cy="3.686" r="2.72" />
                      <circle cx="51.405" cy="3.686" r="2.72" />
                      <circle cx="63.441" cy="3.686" r="2.72" />
                      <circle cx="75.479" cy="3.686" r="2.72" />
                      <circle cx="87.514" cy="3.686" r="2.719" />
                    </g>
                    <g transform="translate(0 49)">
                      <circle cx="3.261" cy="2.767" r="2.72" />
                      <circle cx="15.296" cy="2.767" r="2.719" />
                      <circle cx="27.333" cy="2.767" r="2.72" />
                      <circle cx="39.369" cy="2.767" r="2.72" />
                      <circle cx="51.405" cy="2.767" r="2.72" />
                      <circle cx="63.441" cy="2.767" r="2.72" />
                      <circle cx="75.479" cy="2.767" r="2.72" />
                      <circle cx="87.514" cy="2.767" r="2.719" />
                    </g>
                    <g transform="translate(0 61)">
                      <circle cx="3.261" cy="2.846" r="2.72" />
                      <circle cx="15.296" cy="2.846" r="2.719" />
                      <circle cx="27.333" cy="2.846" r="2.72" />
                      <circle cx="39.369" cy="2.846" r="2.72" />
                      <circle cx="51.405" cy="2.846" r="2.72" />
                      <circle cx="63.441" cy="2.846" r="2.72" />
                      <circle cx="75.479" cy="2.846" r="2.72" />
                      <circle cx="87.514" cy="2.846" r="2.719" />
                    </g>
                    <g transform="translate(0 73)">
                      <circle cx="3.261" cy="2.926" r="2.72" />
                      <circle cx="15.296" cy="2.926" r="2.719" />
                      <circle cx="27.333" cy="2.926" r="2.72" />
                      <circle cx="39.369" cy="2.926" r="2.72" />
                      <circle cx="51.405" cy="2.926" r="2.72" />
                      <circle cx="63.441" cy="2.926" r="2.72" />
                      <circle cx="75.479" cy="2.926" r="2.72" />
                      <circle cx="87.514" cy="2.926" r="2.719" />
                    </g>
                    <g transform="translate(0 85)">
                      <circle cx="3.261" cy="2.927" r="2.72" />
                      <circle cx="15.296" cy="2.927" r="2.719" />
                      <circle cx="27.333" cy="2.927" r="2.72" />
                      <circle cx="39.369" cy="2.927" r="2.72" />
                      <circle cx="51.405" cy="2.927" r="2.72" />
                      <circle cx="63.441" cy="2.927" r="2.72" />
                      <circle cx="75.479" cy="2.927" r="2.72" />
                      <circle cx="87.514" cy="2.927" r="2.719" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pl-14">
              <img src="img/temp/mypage.png" className="btn- shadow-2xl rounded-xl" alt="Health" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInexam;
