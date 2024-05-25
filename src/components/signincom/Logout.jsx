import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/context/AuthProvider";

function Logout() {

	const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	
	const logout = () => {
		
		localStorage.removeItem("id");
		localStorage.removeItem("username");
		      // 쿠키 삭제


		setAuth(null);
		navigate("/");
	};

	useEffect(() => {
		logout();
	}, []);

}

export default Logout;