// routes1.js 파일
import React from 'react';
import MapReadPage from "@/pages/map/MapReadPage";
import CampingSearchPage from '@/pages/Camp/CampingSearchPage';
import { SignIn, SignUp } from '@/pages';
import Logout from '@/components/signincom/Logout';


const routes1 = [

  {
    path: "/MapReadPage/:contentId",
    element: <MapReadPage />,
  },
  {
    path: "/CampingSearchPage/:searchType/:searchValue",
    element: <CampingSearchPage />,
  },
  
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/Logout",
    element: <Logout />,
  },

  
];

export default routes1;
