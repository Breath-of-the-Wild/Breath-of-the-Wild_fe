import React, { useState } from 'react';
import axios from 'axios';
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const SignUpExam = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [birth, setBirth] = useState(""); // birth 상태 추가
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const changeCheckPwd = (event) => {
    setCheckPwd(event.target.value);
  };

  const changeBirth = (event) => {
    setBirth(event.target.value); // birth 변경 함수 추가
  };

  /* 아이디 중복 체크 */
  const checkEmailDuplicate = async () => {
    await axios
      .get("http://localhost:8080/api/member/checkId", { params: { email: email } })
      .then((resp) => {
        console.log("[Join.js] checkEmailDuplicate() success :D");
        console.log(resp.data);

        if (resp.status === 200) {
          alert("사용 가능한 이메일입니다.");
        }
      })
      .catch((err) => {
        console.log("[Join.js] checkEmailDuplicate() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert(resp.data);
        }
      });
  };

  /* 비밀번호 유효성 검사 */
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  /* 회원가입 */
  const join = async () => {
    // 유효성 검사
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!pwd) {
      alert("패스워드를 입력해주세요.");
      return;
    }
    if (!isPasswordValid(pwd)) {
      alert("패스워드는 8자 이상, 특수문자, 영어, 숫자를 포함해야 합니다.");
      return;
    }
    if (!checkPwd) {
      alert("패스워드 확인을 입력해주세요.");
      return;
    }
    if (pwd !== checkPwd) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }
    if (!name) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!birth) {
      alert("생일을 입력해주세요.");
      return;
    }

    const req = {
      email: email,
      password: pwd,
      passwordCheck: checkPwd,
      username: name,
      birth: birth, // birth 필드 추가
    };

    await axios
      .post("http://localhost:8080/api/member/register", req)
      .then((resp) => {
        console.log("[Join.js] join() success :D");
        console.log(resp.data);
        alert(`${name}님 회원가입을 축하드립니다 🎊`);
        window.location.href = "/signin";
      })
      .catch((err) => {
        console.log("[Join.js] join() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert(resp.data);
        }
      });
  };

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-6xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-5 pr-5 pb-5 pl-5 bg-white shadow-2xl rounded-xl relative z-10">
              <Typography variant="h2" className="font-bold mb-2 mt-4">회원가입</Typography>
              <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal"> </Typography>
              <div className="w-full mr-0 mb-0 ml-0 relative space-y-4">
                <div className="text-center relative">
                  <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal"> </Typography>
                </div>

                <div className="mb-1 flex flex-col gap-4 relative">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          이메일
        </Typography>
        <Input
          type="email"
          size="lg"
          placeholder="name@mail.com"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          name="id"
          value={email}
          onChange={changeEmail}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
                     <button className="btn btn-outline-danger" onClick={checkEmailDuplicate}>
          <i className="fas fa-check"></i> 이메일 중복 확인
        </button>
                </div>

                <div className="mb-1 flex flex-col gap-4 relative">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          패스워드
        </Typography>
        <Input
          type="password"
          size="lg"
          placeholder="8자 이상, 특수문자, 영어, 숫자 포함"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          name="password"
          value={pwd}
          onChange={changePwd}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />



                </div>

                <div className="mb-1 flex flex-col gap-4 relative">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          패스워드 확인
        </Typography>
        <Input
          type="password"
          size="lg"
          placeholder="8자 이상, 특수문자, 영어, 숫자 포함"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          name="password2"
          value={checkPwd}
          onChange={changeCheckPwd}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />


                </div>
                <div className="mb-1 flex flex-col gap-4 relative">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          닉네임
        </Typography>
        <Input
          type="text"
          size="lg"
          placeholder="닉네임"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          name="username"
          value={name}
          onChange={changeName}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
</div>
                <div className="mb-1 flex flex-col gap-4 relative">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
          생일
        </Typography>
        <Input
          type="date"
          size="lg"
          placeholder=""
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          name="birth"
          value={birth}
          onChange={changeBirth}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />


                </div>
                <div className="mb-1 flex flex-col gap-4 relative">
                <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
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


                </div>

                {/* 버튼 */}
                <div className="relative">
                <Button className="mt-6" onClick={join} fullWidth disabled={!isChecked}>
        회원가입
      </Button>
            
      <div className="mb-1 flex flex-col gap-4 relative">
      <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
        이미 계정이 있으신가요?
        <Link to="/SignIn" className="text-gray-900 ml-1">로그인 하러가기</Link>
      </Typography>


                </div>

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
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12 ">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pl-14 ">
              <img src="img/temp/mypage.png" className="btn- shadow-2xl rounded-xl" alt="Health" />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SignUpExam;
