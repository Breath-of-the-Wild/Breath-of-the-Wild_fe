import React, { useState } from 'react';
import { Typography } from "@material-tailwind/react";
import DateSelection from '../recommendcom/DateSelection';
import { Link } from 'react-router-dom';
import './Search.css';

const Search = ({ onDateChange }) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${year}-${month}-${day}`;


  const [selectedStartDate, setSelectedStartDate] = useState(formattedToday);
  const [selectedEndDate, setSelectedEndDate] = useState(formattedToday);

  const handleDateChange = (date, label) => {
    if (label === "selectedStartDate") {
      setSelectedStartDate(date);
      if (date > selectedEndDate) {
        alert("시작 날짜는 종료 날짜보다 이후일 수 없습니다.");
      }
    } else if (label === "selectedEndDate") {
      setSelectedEndDate(date);
      if (date < selectedStartDate) {
        alert("종료 날짜는 시작 날짜보다 이전일 수 없습니다.");
      }
    }

    onDateChange(date, label);
  };

  return (
    <div className="border-2 border-white rounded-md shadow w-1/3 mx-auto grid grid-cols-6 p-5 relative z-50 your-element text-white gap-0">
      <div className="col-span-2 z-0 border-2 rounded-md p-2 text-center homeSerch">
        <DateSelection onSelectDate={handleDateChange} label="selectedStartDate" />
      </div>
      <Typography
        className="col-1 text-center"
        variant="h3"
        color="white"
      >
        ~
      </Typography>
      <div className="col-span-2 z-0 border-2 p-2 rounded-md text-center homeSerch">
        <DateSelection onSelectDate={handleDateChange} label="selectedEndDate" />
      </div>
      <div>
        <Link to={selectedEndDate >= selectedStartDate ? `/Recommend/${selectedStartDate}/${selectedEndDate}` : '#'}>
          <button
            className='text-center text-white border-2 rounded-md p-2 border-white'
            onClick={() => {
  
            }}
          >
            검색
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Search;
