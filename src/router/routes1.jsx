// routes1.js 파일
import React from 'react';
import MapReadPage from "@/pages/map/MapReadPage";

const routes1 = [
  {
    id: 12,
    path: "/MapReadPage/:contentId",
    element: <MapReadPage />,
  }
  
];

export default routes1;
