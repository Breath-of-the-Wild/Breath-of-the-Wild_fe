import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { GiCampingTent } from "react-icons/gi";
import { BiSolidLandscape } from "react-icons/bi";
import { FaCampground, FaMountain, FaTree } from "react-icons/fa";
import './CampList.css';

const CampList = ({ area }) => {
  const [campingData, setCampingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedNature, setSelectedNature] = useState("");
  const [selectedInduty, setSelectedInduty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(area);
        const response = await axios.get(`http://localhost:8080/api/camping/list/${area}`);

        console.log(response.data);
        if (response.data) {
          setCampingData(response.data);
        } else {
          console.error('데이터를 가져오는데 오류가 발생했습니다: 응답 본문의 구조가 잘못되었습니다');
        }
      } catch (error) {
        console.error('데이터를 가져오는데 오류가 발생했습니다:', error);
      }
    };

    if (area) {
      fetchData();
    }
  }, [area]);

  const filteredData = campingData.filter(camp => {
    const matchesNature = selectedNature ? camp.lctCl.includes(selectedNature) : true;
    const matchesInduty = selectedInduty ? camp.induty.includes(selectedInduty) : true;
    return matchesNature && matchesInduty;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  const handleNatureFilterChange = (nature) => {
    setSelectedNature(nature);
    setCurrentPage(1); // Reset to first page
  };

  const handleIndutyFilterChange = (induty) => {
    setSelectedInduty(induty);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="camp-list-container">
      <div className="rounded-md">총 {filteredData.length}개</div>

      <div className="filters">

        <div className="filter-group flex flex-row items-center">
        
        <FaTree /><span>자연환경 :</span>
          {['호수', '도심', '숲', '해변', '산', '계곡', '강'].map(nature => (
            <button
              key={nature}
              onClick={() => handleNatureFilterChange(nature)}
              className={`filter-button ${selectedNature === nature ? 'active' : ''}`}
            >
              {nature}
            </button>
          ))}
        </div>

        <div className="filter-group flex flex-row items-center">
          
          <FaCampground /><span>장소구분 :</span>
          {['일반야영장', '자동차야영장', '카라반', '글램핑'].map(induty => (
            <button
              key={induty}
              onClick={() => handleIndutyFilterChange(induty)}
              className={`filter-button ${selectedInduty === induty ? 'active' : ''}`}
            >
              {induty}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {getCurrentPageItems().map((camp) => (
          <Link key={camp.contentId} to={`/MapReadPage/${camp.contentId}`}>
            <div id='camp' className='rounded-md shadow-md p-3 grid grid-rows-7'>
              <div className='row-span-4 overflow-hidden'>
                <img src={camp.firstImageUrl} className='h-full w-full object-cover rounded-sm' alt={camp.facltNm} />
              </div>
              
              <div className='flex justify-between my-auto'>
                <Typography variant='h5'>{camp.facltNm}</Typography>
                <Typography variant='h6' color='yellow'>별점</Typography>
              </div>
              
              <div className='flex gap-3 my-auto'>
                <div className='flex'>
                  <GiCampingTent size={23}/>
                  <p>{camp.induty}</p>
                </div>
                <div className='flex'>
                  <BiSolidLandscape size={20}/>
                  <p>{camp.lctCl}</p>
                </div>
              </div>
              
              <div className='my-auto'>
                <Typography variant='h7' className='truncate'>{camp.addr1}</Typography>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none">이전</button>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">다음</button>
      </div>
    </div>
  );
};

export default CampList;
