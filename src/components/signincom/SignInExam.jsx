import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "@/context/AuthProvider";
import { HttpHeadersContext } from "@/context/HttpHeadersProvider";
import { useNavigate } from "react-router";

const SignInexam = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const kakaoid = localStorage.getItem("kakaoid");
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

    await axios.post("http://localhost:8080/api/member/login", req)
      .then((resp) => {
        console.log("[Login.js] login() success :D");
        console.log(resp.data);

        alert(resp.data.email + "님, 성공적으로 로그인 되었습니다 🔐");

        // JWT 토큰 저장
        localStorage.setItem("bbs_access_token", resp.data.token);
        localStorage.setItem("id", resp.data.email);
        localStorage.setItem("username", resp.data.username);

        setAuth(resp.data.email); // 사용자 인증 정보(아이디 저장)
        setHeaders({ "Authorization": `Bearer ${resp.data.token}` }); // 헤더 Authorization 필드 저장

        if (saveId) {
          localStorage.setItem("saved_id", id);
        } else {
          localStorage.removeItem("saved_id");
        }

        window.location.href = "/";
      }).catch((err) => {
        console.log("[Login.js] login() error :<");
        console.log(err);

        alert("⚠️ " + err.response.data);
      });
  }

  const Rest_api_key='f9d485b1ab7d9258c446b63e73b7ef47' //REST API KEY
    const redirect_uri = 'http://localhost:5173/auth' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const kakaohandleLogin = ()=>{
        window.location.href = kakaoURL
    }



  return (
    <div className="w-2/5 lg:w-1/3 my-10 m-auto rounded-md shadow-md p-5">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-2 mt-4">로그인{kakaoid}</Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">이메일과 패스워드를 입력해주세요</Typography>
      </div>

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
          value={id}
          onChange={changeId}
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
          value={pwd}
          onChange={changePwd}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>

      <Button className="mt-6" onClick={login} fullWidth>
        로그인
      </Button>
      <div className="flex items-center justify-between gap-2 mt-6">
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
          <a href="#">
           
          </a>
        </Typography>
      </div>
      <div className="flex justify-center items-center">

        <Button  color="white" className="flex items-center justify-center shadow-md text-center"  onClick={kakaohandleLogin}>

          <img src="/public/img/icon/kakao_login_medium_wide.png"></img>
        </Button>
      </div>
      <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
        아이디가 없으신가요?
        <Link to="/SignUp" className="text-gray-900 ml-1">회원가입</Link>
      </Typography>
    </div>
  );
};

export default SignInexam;
