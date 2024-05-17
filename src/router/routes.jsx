// routes.js 파일
import React from 'react';
import Recommend from "../pages/recommend/recommend";
import Help from "../pages/help/help";
import Festival from '@/pages/festival/festival';
import SignIn from '@/pages/sign/signin';
import SignUp from '@/pages/sign/signup';
import Home from '@/pages/home/home';
// routes 임포트
import routes1 from './routes1'; 
import routes2 from './routes2';
import routes3 from './routes3';
import Review from '@/pages/review/review';
import Logout from '@/components/signincom/Logout';

const routes = [
  {
    id: 1,
    name: "홈",
    path: "/home",
    element: <Home />,
  },
  {
    id: 2,
    name: "캠핑장 추천",
    path: "/recommend",
    element: <Recommend />,
  },
  {
    id: 3,
    name: "축제 정보",
    path: "/festival",
    element: <Festival />,
   
},
  {
    id: 4,
    name: "고객센터",
    path: "/help",
    element: <Help />,
  },
  {
    id: 5,
    name: "리뷰게시판",
    path: "/review",
    element: <Review />,
  },
  {
    id: 6,
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    id: 7,
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    id: 8,
    path: "/Logout",
    element: <Logout />,
  },


  ...routes1, // routes1 배열을 routes 배열에 병합
  ...routes2,
  ...routes3,

];

export default routes;
