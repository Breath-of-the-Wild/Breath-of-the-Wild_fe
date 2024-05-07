import React from 'react';
import {
  Typography,
} from "@material-tailwind/react";

const ReadTop = () => {
  return (
    <div className="flex flex-col items-center  justify-center read_background_image">
      <div className="px-4 text-center">
        <div className="flex flex-col items-center">
          <Typography
            variant="h1"
            color="white"
            className="mb-6 font-White"
          >
            상세 페이지
          </Typography>
          
        </div>
      </div>
    </div>
  );
};

export default ReadTop;