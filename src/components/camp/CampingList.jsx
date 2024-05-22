import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { GiCampingTent } from "react-icons/gi";
import { BiSolidLandscape } from "react-icons/bi";

const CampingList = () => {
  const [campingData, setCampingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // 페이지당 항목 수
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/camping/all');

        if (response.data) {
          setCampingData(response.data);
        } else {
          console.error('Error fetching data: Response body structure is incorrect');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(campingData.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return campingData.slice(startIndex, endIndex);
  };

  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  };

  // 검색 결과를 필터링합니다.
   // handleSearch 함수 수정
const handleSearch = async () => {
  // 전체 데이터를 요청하여 가져옵니다.
  const apiUrl = `http://localhost:8080/api/camping/all`;
  
  try {
      const response = await axios.get(apiUrl);
      const allData = response.data;

      // 검색 쿼리가 있을 때 전체 데이터에서 필터링합니다.
      if (searchQuery) {
          const lowerCaseQuery = searchQuery.toLowerCase();
          const filteredPosts = allData.filter(camp => camp.addr1.toLowerCase().includes(lowerCaseQuery));
          setPosts(filteredPosts);
      } else {
          // 검색 쿼리가 없는 경우 전체 데이터를 표시합니다.
          setPosts(allData);
      }
  } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
  }
};
const [searchType, setSearchType] = useState('facltNm');
const [searchValue, setSearchValue] = useState('');


  return (
    <div className="relative pt-2 lg:pt-2 min-h-screen">
      {/* 검색 바 */}
      <div className="bg-white rounded-md shadow-lg w-full md:w-1/3 mx-auto -mt-12 py-5 mb-10 grid grid-cols-4 gap-4 px-4">
        <select
          className="rounded-md h-10 col-span-1 sm:col-span-1"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="facltNm">캠핑장 이름</option>
          <option value="addr1">지역</option>
        </select>

        <input
          type="text"
          placeholder="검색어를 입력하세요"
         className="py-2 border rounded col-span-2 sm:col-span-2"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {/* 검색 버튼 */}
        <div className="mx-auto col-span-1 sm:col-span-1">
        <Link to={`/CampingSearchPage/${searchType}/${searchValue}`}>
          <button
            className="py-2 px-4 bg-green-500 text-white rounded"
            onClick={handleSearch}
          >
          검색
          </button>
        </Link>
        </div>
      </div>
      
      <div className='mt-10 mx-auto max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <Typography
            variant='h5'
            className='mb-5'>
              총 {campingData.length}개
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center max-w-2xl p-5 lg:max-w-7xl lg:px-8 mx-auto">
            {getCurrentPageItems().map((camp) => (
            <Link key={camp.contentId} to={`/MapReadPage/${camp.contentId}`}>
                <div id='camp' className='rounded-md shadow-md p-3 grid grid-rows-7'>
                    <div className='row-span-4 overflow-hidden'>
                          <img 
                          src={camp.firstImageUrl ? camp.firstImageUrl : "img/camp/camp1.jpg"}
                          className='h-full w-full object-cover rounded-sm' 
                          alt={camp.facltNm} />
                    </div>
                    {/* 이름 별점 */}
                        <div className='flex justify-between my-auto'>
                        <Typography
                        variant='h5'                  
                        >
                          {camp.facltNm}
                        </Typography>
                        <Typography
                        variant='h6'
                        color='yellow'
                        >
                            별점
                        </Typography>
                        </div>
                    {/* 정보 */}
                        <div className='flex gap-3 my-auto'>
                            <div className='flex'>
                                <GiCampingTent size={23}/>
                                <p>{camp.induty}</p>
                            </div>
                            <div className='flex'>
                                < BiSolidLandscape size={20}/>
                                <p>{camp.lctCl}</p>
                            </div>
                        </div>
                    {/* 주소 */}
                        <div className=' my-auto'>
                        <Typography
                        variant='h7'
                        className='truncate'
                        >
                            {camp.addr1}
                            </Typography>
                        </div>
                </div>
            </Link>
        ))}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none">이전</button>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none">다음</button>
        </div>
      </div>
    </div>        
);
};

export default CampingList;
