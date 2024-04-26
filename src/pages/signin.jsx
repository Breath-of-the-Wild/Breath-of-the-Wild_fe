import SignInTop from "@/components/signincom/SignInTop";
import SignInexam from "@/components/signincom/SignInexam";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


export function SignIn() {
  return (
    <div>
    <SignInTop/>
    <SignInexam />
    </div>
  );
}

export default SignIn;
