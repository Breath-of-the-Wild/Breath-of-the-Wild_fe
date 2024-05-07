import SignUpExam from "@/components/signupcom/SignUpExam";
import SignUpTop from "@/components/signupcom/SignUpTop";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


export function SignUp() {
  return (
    <div>
      <SignUpTop />
     <SignUpExam />
    </div>
  );
}

export default SignUp;
