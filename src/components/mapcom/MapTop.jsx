import React from 'react';
import {
    Typography,
  } from "@material-tailwind/react";

const MapTop = () => {
    return (
       
                 <div className="ml-auto mr-auto w-full px-4 text-center background-image" >
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
     
        
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full lg:w-12/12">
            <Typography
                variant="h1"
                color="white"
                className="mb-6 font-White"
              >
                            맵 페이지
              </Typography>
              <div className="col">
              <input className="rounded-md w-80 h-10 pl-3 col-2" type="text" placeholder="원하시는 지역을 입력해주세요"></input>
              <button type="button" className="rounded-md w-10 h-10 col-2 bg-white ml-2" >검색</button>
              </div>
              <Typography variant="lead" color="white" className="opacity-80">

              </Typography>
            </div>
          </div>
        </div>
      </div>
   
        
    );
};

export default MapTop;