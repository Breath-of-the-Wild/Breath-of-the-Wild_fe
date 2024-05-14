import React from 'react';
import {
    Typography,
  } from "@material-tailwind/react";

const SignInTop = () => {
  return (
    <div style={{ height: '50vh' }}>
              <div className="ml-auto mr-auto w-full px-4 text-center h-full" 
              style={{
               backgroundImage:`linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45)),URL('/img/background/bg-m.jpg')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center bottom'
               }}>
   <div className="relative flex h-full content-center items-center justify-center pt-20 pb-20">
       <div className="flex flex-wrap items-center">
         <div className="ml-auto mr-auto w-full lg:w-12/12">
         <Typography
             variant="h3"
             color="white"
             className="mb-6 font-White"
           >
             회원가입
           </Typography>
         </div>
       </div>
     </div>
   </div>
   </div>
   
        
    );
};

export default SignInTop;