
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';


const BestFestival = () => {


    const { searchType, searchValue } = useParams();

    const [festivalData, setfestivalData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // 페이지당 항목 수
  
    useEffect(() => {
        const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:8080/api/festivals/all');
    
            if (response.data) {
                setfestivalData(response.data);
            } else {
              console.error('Error fetching data: Response body structure is incorrect');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
  

  
    const totalPages = Math.ceil(festivalData.length / itemsPerPage);
  
    const getCurrentPageItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return festivalData.slice(startIndex, endIndex);
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
      

{getCurrentPageItems().map((festival) => (
<article className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
        {/* 축제 세부 정보를 보여주는 링크 */}
        <Link to={`/detail/${festival.contentid}`} className="absolute top-0 right-0 left-0 bottom-0 opacity-0" />
        {/* 축제 이미지 */}
        <div className="relative mb-4 rounded-2xl">
            <img
                alt={festival.title}
                className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                src={festival.firstimage}
            />
            {/* 이미지 위의 축제 보러가기 버튼 */}
            <Link
                to={`/detail/${festival.contentid}`}
                className="flex justify-center items-center bg-blue-700 bg-opacity-70 absolute top-0 left-0 w-full h-full text-white text-3xl rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
                축제 보러가기
                {/* 화살표 아이콘 */}
                <svg
                    className="ml-2 w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </svg>
            </Link>
        </div>
        {/* 축제 제목 */}
        <h3 className="font-medium text-xl leading-8">
            <Link className="block relative group-hover:text-red-700 transition-colors duration-200" to={`/detail/${festival.contentid}`}>
                {festival.title}
            </Link>
        </h3>
        {/* 축제 세부 정보 */}
        <div className="flex justify-between items-center pb-4">
            <div className="flex items-center">
                {/* 축제 이미지 */}
                <img alt={festival.title} className="h-12 w-12 rounded-full object-cover" src={festival.firstimage} />
                <div className="ml-3">
                    <p className="text-sm font-semibold">축제기간</p>
                    <p className="text-sm text-gray-500 flex">
                        {/* 시계 아이콘 */}
                        <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 6v6h4" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                       {/* formatDate 함수를 사용하여 날짜 형식 변환 */}
                {festival.eventstartdate} ~ {festival.eventenddate}
                    </p>
                </div>
            </div>
            {/* 축제 주소 */}
            <div className="flex justify-end text-sm text-gray-500">
                {/* 지도 아이콘 */}
                <svg
                    className="ml-1 w-4 h-4"
                    fill="currentColor"
                    stroke="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 2.39 1.19 4.65 3.26 6.26C9.1 15.84 9.92 16.5 12 21c2.08-4.5 2.9-5.16 3.74-5.74C17.81 13.65 19 11.39 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {festival.addr1}
            </div>
        </div>
    </article>

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

export default BestFestival;