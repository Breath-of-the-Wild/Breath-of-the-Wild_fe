import React from 'react';
import './RecommendMap.css'

const RecommendCard = ({ area, onClose }) => {
  return (
      <div className="relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-5">
        <div>
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {area}도의 캠핑장 {/* 선택한 지역의 이름 */}
          </h5>
          
        </div>

        <div>
        {/* 캠핑장 카드 */}
        <CampList />
        </div>
      </div>
  );
};

export default RecommendCard;