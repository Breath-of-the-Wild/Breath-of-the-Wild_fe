import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/context/AuthProvider";
import Cookies from "js-cookie";

function Logout() {

   const { auth, setAuth } = useContext(AuthContext);

   const navigate = useNavigate();
   
   const logout = () => {
      
      localStorage.removeItem("id");
      localStorage.removeItem("username");
      Cookies.remove("access_token"); // 쿠키 삭제
      Cookies.remove("refresh_token"); // 쿠키 삭제

      setAuth(null);
      navigate("/");
   };

   useEffect(() => {
      logout();
   }, []);

}

export default Logout;