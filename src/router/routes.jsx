// routes.js 파일
import React from 'react';
import Recommend from "../pages/recommend/recommend";
import Help from "../pages/help/help";
import Festival from '@/pages/festival';
import SignIn from '@/pages/sign/signin';
import SignUp from '@/pages/sign/signup';
import Home from '@/pages/home/home';
// routes 임포트
import routes1 from './routes1'; 
import routes2 from './routes2';
import routes3 from './routes3';
import routes4 from './routes4';
import routes5 from './routes5';

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
    id: 4,
    name: "축제 정보",
    path: "/festival",
    element: <Festival />,
   
},
  {
    id: 6,
    name: "고객센터",
    path: "/help",
    element: <Help />,
  },
  {
    id: 7,
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    id: 8,
    path: "/SignUp",
    element: <SignUp />,
  },


  ...routes1, // routes1 배열을 routes 배열에 병합
  ...routes2,
  ...routes3,
  ...routes4,
  ...routes5,

];

export default routes;
