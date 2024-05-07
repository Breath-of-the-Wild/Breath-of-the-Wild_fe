// routes1.js 파일
import React from 'react';
import MaplistPage from "@/pages/map/MapListPage";
import MapReadPage from "@/pages/map/MapReadPage";
import Example from "@/pages/map/Example";

const routes1 = [
  {
    id: 11,
    path: "/MapListPage",
    element: <MaplistPage />,
  },
  {
    id: 12,
    path: "/MapReadPage/:contentId",
    element: <MapReadPage />,
  },
  {
    id: 13,
    path: "/Example",
    element: <Example />,
  },
  
];

export default routes1;
