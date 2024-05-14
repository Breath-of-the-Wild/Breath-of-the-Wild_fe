import { Typography } from "@material-tailwind/react";
import React, { useState } from 'react';
import DateSelection from "./DateSelection";

const Searchcom = ({onDateChange}) => {
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
        // 선택된 시작 날짜를 RecommendBody로 전달
        onDateChange(date, "selectedStartDate");
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
        // 선택된 종료 날짜를 RecommendBody로 전달
        onDateChange(date, "selectedEndDate");
    };

    return(
    <div className="bg-white rounded-md shadow w-1/3 mx-auto grid grid-cols-5 -mt-10 p-5">
        <div className="col-span-2 z-0 border p-2 text-center">
            <DateSelection onSelectDate={handleStartDateChange} label="selectedStartDate" />
            </div>
            <Typography
            className="col-1 text-center"
                variant="h3"
                color="black"
            >
                ~
            </Typography>
            <div className="col-span-2 z-0 border p-2 text-center">
            <DateSelection onSelectDate={handleEndDateChange} label="selectedEndDate" />
            </div>
    </div>

    );
};

export default Searchcom;