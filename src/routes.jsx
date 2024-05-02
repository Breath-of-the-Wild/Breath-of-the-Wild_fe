import { Home, Profile, SignIn, SignUp } from "@/pages";
import Recommend from "./pages/recommend";
import Map from "./pages/map";
import Festival from "./pages/festival";
import Assignment from "./pages/assignment";
import Help from "./pages/help";


export const routes = [
  {
    name: "홈",
    path: "/home",
    element: <Home />,
  },
  {
    name: "캠핑장 추천",
    path: "/recommend",
    element: <Recommend />,
  },
  {
    name: "지도",
    path: "/map",
    element: <Map />,
  },

  {
    name: "축제정보",
    path: "/festival",
    element: <Festival />,
  },

  {
    name: "양도게시판",
    path: "/assignment",
    element: <Assignment />,
  },
  {
    name: "고객센터",
    path: "/help",
    element: <Help />,
  },
  {
    name: "",
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    name: "",
    path: "/SignUp",
    element: <SignUp />,
  },

];

export default routes;
