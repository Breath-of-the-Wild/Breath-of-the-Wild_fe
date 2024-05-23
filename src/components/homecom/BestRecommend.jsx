import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { GiCampingTent } from "react-icons/gi";
import { BiSolidLandscape } from "react-icons/bi";

const BestRecommend = () => {
  const [campingData, setCampingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // 페이지당 항목 수

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


  return (
    <div>

        
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {getCurrentPageItems().map((camp) => (
            <Link key={camp.contentId} to={`/MapReadPage/${camp.contentId}`}>
                <div id='camp' className='rounded-md shadow-md p-3 grid grid-rows-7'>
                    <div className='row-span-4 overflow-hidden'>
                          <img src={camp.firstImageUrl} className='h-full w-full object-cover rounded-sm' alt={camp.facltNm} />
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
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none">이전</button>
          {/* <select
              value={currentPage}
              onChange={e => setCurrentPage(parseInt(e.target.value))}
              className="block py-2.5 px-0 w-12 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select> */}
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">다음</button>
        </div>
      </div>
  );
};

export default BestRecommend;
