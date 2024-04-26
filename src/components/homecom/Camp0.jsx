import React, { useState, useEffect } from 'react';
import weathercampData from '@/data/weathercamp';
import BestCampData from '@/data/BestCamp';

const Camp0 = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setProducts(BestCampData);
  }, []);

  // 현재 페이지에 해당하는 상품 데이터를 가져오는 함수
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

  return (

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">가장 인기 있는 캠핑장 추천</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* 현재 페이지에 해당하는 상품 데이터를 매핑하여 출력 */}
          {getCurrentPageItems().map(product => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 페이징 컴포넌트 */}
        <div className="flex justify-center mt-6">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none">이전</button>
          <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">다음</button>
        </div>
      </div>
    
  );
};

export default Camp0;
