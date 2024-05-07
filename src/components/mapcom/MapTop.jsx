import React from 'react';
import {
  Typography,
} from "@material-tailwind/react";

const MapTop = () => {
  return (
    <div className="flex flex-col items-center  justify-center backgroundimage1">
      <div className="px-4 text-center">
        <div className="flex flex-col items-center">
          <Typography
            variant="h1"
            color="white"
            className="mb-6 font-White"
          >
            맵 페이지
          </Typography>
          <div className="flex items-center">
            <input className="rounded-md w-80 h-10 pl-3 col-2" type="text" placeholder="원하시는 지역을 입력해주세요" />
            <button type="button" className="rounded-md w-10 h-10 col-2 bg-white ml-2">검색</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTop;
