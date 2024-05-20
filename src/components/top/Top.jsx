// Top.jsx

import React from 'react';
import {
  Typography,
} from "@material-tailwind/react";
import { TopData } from '@/data/top';

const Top = ({ title }) => {

  const topItem = TopData.find(item => item.id === title);

  if (!topItem) {
    return null;
  }

  return (
    <div style={{ height: '50vh' }}>
      <div className="ml-auto mr-auto w-full px-4 text-center h-full" 
           style={{
             backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45)),URL('${topItem.imgSrc}')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="relative flex h-full content-center items-center justify-center pt-20 pb-20">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full lg:w-12/12">
              <Typography
                variant="h3"
                color="white"
                className="font-White"
              >
                {topItem.name}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
