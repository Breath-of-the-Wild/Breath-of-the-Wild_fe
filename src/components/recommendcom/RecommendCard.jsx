import React from 'react';
import './PollutionMap.css'
import CampList from '../mapcom/RecommendCampList';

const RecommendCard = ({area}) => {
  return (
        <div>
        <CampList area={area}/>
        </div>
  );
};

export default RecommendCard;