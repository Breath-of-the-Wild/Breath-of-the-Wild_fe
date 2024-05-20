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

    return(
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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