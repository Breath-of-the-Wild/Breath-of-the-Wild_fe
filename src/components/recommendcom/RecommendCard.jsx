import React from 'react';
import './RecommendMap.css'
import CampList from '../mapcom/CampList';
import { Typography } from '@material-tailwind/react';
import Search2 from '../camp/Search2';

const RecommendCard = ({area}) => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
        <div>
        <Typography variant='h4'>
            {area}의 캠핑장 
            </Typography>
        </div>

        <div>
        {/* 캠핑장 카드 */}
        <CampList area={area}/>
        {/* <Search2 /> */}
        </div>
      </div>
  );
};

export default RecommendCard;