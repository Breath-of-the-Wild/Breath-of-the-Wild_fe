import React from 'react';
import './HelpTop.css'
import {
    Typography,
  } from "@material-tailwind/react";

const HelpTop = () => {
    return (
       
                 <div className="ml-auto mr-auto w-full px-4 text-center backgroundimage" >
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
     
        
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full lg:w-12/12">
            <Typography
                variant="h1"
                color="white"
                className="mb-6 font-White"
              >
                            고객센터 페이지
              </Typography>
        
              <Typography variant="lead" color="white" className="opacity-80">

              </Typography>
            </div>
          </div>
        </div>
      </div>
   
        
    );
};

export default HelpTop;