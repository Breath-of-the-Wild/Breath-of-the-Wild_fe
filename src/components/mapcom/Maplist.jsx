import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MapList = () => {
  const [campingData, setCampingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 항목 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apis.data.go.kr/B551011/GoCamping/basedList', {
          params: {
            numOfRows: 4000,
            pageNo: 1,
            MobileOS: 'WIN',
            MobileApp: '22',
            serviceKey: 'lzGvqDf5E5TR4COdKFCVs/8cc/NaPzSTIRWyXjR2AlJAJMn0O0aKlspa8XwDBDYcOPpWuV1v7ZLRCyj9mgNkqw==',
            _type: 'json',
          },
        });

        if (response.data && response.data.response && response.data.response.body) {
          const data = response.data.response.body;
          if (Array.isArray(data.items.item)) {
            setCampingData(data.items.item);
          } else if (data.items.item) {
            setCampingData([data.items.item]);
          } else {
            console.error('Error fetching data: Item structure is incorrect');
          }
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
    <div className='flex max-h-1000 overflow-y-auto maplist'>
      <div className="w-full mt-12 overflow-y-auto px-10 ">
        <div className="rounded-md">총 매물 수: {campingData.length}개</div>
        <div className="flex items-center justify-between">
          <div className="rounded-md">

          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8 border-gray-900">
          {getCurrentPageItems().map((camp) => (
            
           <Link key={camp.contentId} to={`/MapReadPage/${camp.contentId}`}>
              <div className="group relative">
                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                  <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <img src={camp.firstImageUrl} className="h-full w-full object-cover object-center lg:h-full lg:w-full" alt={camp.facltNm} />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                    <button
                      className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      data-ripple-dark="true"
                    >
                      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {camp.facltNm}
                      </h5>
                      <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-mt-0.5 h-5 w-5 text-yellow-700">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
                        </svg>
                        5.0
                      </p>
                    </div>
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center">
                        <img src="https://img.icons8.com/windows/24/null/bedroom.png" alt="Bedroom Icon" />
                        <p className="ml-2 text-sm font-medium text-gray-700">3 침대</p>
                      </div>
                      <div className="flex items-center">
                        <img src="https://img.icons8.com/pastel-glyph/24/null/bath--v2.png" alt="Bathroom Icon" />
                        <p className="ml-2 text-sm font-medium text-gray-700">2 화장실</p>
                      </div>
                      <div className="flex items-center">
                        <img src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png" alt="Area Icon" />
                        <p className="ml-2 text-sm font-medium text-gray-700"> 주변시설</p>
                      </div>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                        {camp.doNm}  {camp.sigunguNm}
                      </p>
                      <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                        50000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none">이전</button>
          <select
              value={currentPage}
              onChange={e => setCurrentPage(parseInt(e.target.value))}
              className="block py-2.5 px-0 w-12 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>{page}</option>
              ))}
            </select>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">다음</button>
        </div>
      </div>
    </div>
  );
};

export default MapList;
