import React, { useState,useEffect } from 'react';
import ReviewCard from "./ReviewCard";
import BestCampData from '@/data/BestCamp';

const ReviewBody =() => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        setProducts(BestCampData);
      }, []);

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return products.slice(startIndex, endIndex);
      };

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(products.length / itemsPerPage);
  
    // 다음 페이지로 이동하는 함수
    const nextPage = () => {
      setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };
  
    // 이전 페이지로 이동하는 함수
    const prevPage = () => {
      setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };


// 검색 결과를 필터링합니다.
   // handleSearch 함수 수정
   const handleSearch = async () => {
    // 전체 데이터를 요청하여 가져옵니다.
    const apiUrl = `http://localhost:8080/api/review/all`;
    
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
  const [searchValue, setSearchValue] = useState('');
  const [desc, setDesc] = useState('');

    return(
      <div className="relative pt-2 lg:pt-2 min-h-screen">
        {/* 검색 바 */}
        <div className="bg-white rounded-md shadow-lg w-full md:w-1/3 mx-auto -mt-12 py-5 grid grid-cols-3 gap-4 px-4">
          <input
              type="text"
              placeholder="캠핑장 이름을 검색해주세요"
              className="py-2 border rounded col-span-2 sm:col-span-2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
          />

          <div className="mx-auto col-span-1 sm:col-span-1">
              {/* 검색 버튼 / 리뷰 검색 구현시 Link 연결 */}
              {/* <Link to={`/FestivalSearchPage/${facltNm}/${searchValue}`}> */}
                  <button
                      className="py-2 px-4 bg-green-500 text-white rounded"
                      onClick={handleSearch}
                  >
                      검색
                  </button>
              {/* </Link> */}
          </div>
        </div>

        {/* 나열 select */}
        <div className='flex justify-end text-center max-w-2xl lg:max-w-7xl lg:px-8 mb-10'>
          <select
            className='rounded-md h-10 border-gray-600 border-2'
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}>
              <option value="#">추천수 많은 순</option>
              <option value="#">등록 최신 순</option>
              <option value="#">등록 오래된 순</option>
            </select>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center max-w-2xl p-5 lg:max-w-7xl lg:px-8 mx-auto">
                {getCurrentPageItems().map(product => (
                    <ReviewCard id={product.id} />
                ))}
            </div>

            <div className="flex justify-center mt-6">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none">이전</button>
            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">다음</button>
          </div>
        </div>

    );
};

export default ReviewBody;