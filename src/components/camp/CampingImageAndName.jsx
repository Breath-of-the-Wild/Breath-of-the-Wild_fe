import React from 'react';
import { Typography } from '@material-tailwind/react';

const CampingImageAndName = ({ firstImageUrl, facltNm }) => {
  return (
    <div>
      <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-5">
        <img
          src={firstImageUrl ? firstImageUrl : "img/camp/camp.jpg"}
          className="h-full w-full object-cover object-center"
          alt="Camping Site"
        />
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <Typography variant='h2'>
            {facltNm || "캠핑장 이름이 없습니다"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CampingImageAndName;
