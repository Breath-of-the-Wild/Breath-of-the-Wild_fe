import React, { useState } from 'react';
import PollutionMap from './RecommendMap';
import Searchcom from './Searchcom';
import WeatherTable from './WeatherTable';

const RecommendBody = () => {
  
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const handleDateChange = (date, label) => {
      if (label === "selectedStartDate") {
          setSelectedStartDate(date);
      } else if (label === "selectedEndDate") {
          setSelectedEndDate(date);
      }
  };

  return (
    <div>
      {/* 날짜선택 */}
      <Searchcom onDateChange={handleDateChange} />

      <div className="mx-auto max-w-2xl p-5 lg:max-w-7xl lg:px-8 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10">
        {/* 날씨 */}
        <div>
          <WeatherTable selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} />
        </div>
        
        {/* 지도 */}
        <div>
          <PollutionMap />
        </div>
          
      </div>
    </div>
  );
};

export default RecommendBody;
