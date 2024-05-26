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
      localStorage.removeItem('access_token');
      localStorage.removeItem('expiresIn');
  
      // 쿠키에서 토큰을 삭제합니다.
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      setAuth(null);
      navigate("/");
   };

   useEffect(() => {
      logout();
   }, []);

}

export default Logout;