import React from 'react';
import { Typography } from '@material-tailwind/react';
import { FaTag } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import CampLikeButton from '@/components/camp/CampLikeButton';
import ReviewWrite from '@/components/reviewcom/ReviewWrite';
import ReviewList from '@/components/reviewcom/ReviewList';

const CampingInfo = ({ campingData, contentId, email }) => {
  const ConditionalLi = ({ data }) => {
    if (data.length === 0) {
      return null;
    } else {
      return <li>{data}</li>;
    }
  };

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <div className='flex gap-5'>
        <div className='flex text-center'>
          <FaTag color='green'/>
          <Typography variant='h4' color='gray'>
            {campingData.induty || "산업군 정보가 없습니다"}
          </Typography>
        </div>
        <div className='flex text-center'>
          <FaTag color='green'/>
          <Typography variant='h4' color='gray'>
            {campingData.lctCl || "위치 정보가 없습니다"}
          </Typography>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="sr-only">Reviews</h3>
        {/* 리뷰 표시 로직 추가 */}
      </div>
      <div className="mt-10 flex text-center">
        <h3 className="sr-only">Address</h3>
        <FaLocationDot color='green'/>
        <p className='pl-2'>{campingData.addr1 || "주소 정보가 없습니다"}</p>
      </div>
      <div className="mt-4 flex text-center">
        <h3 className="sr-only">Number</h3>
        <FaPhone color='green'/>
        <p className='pl-2'>{campingData.tel || "전화번호 정보가 없습니다"}</p>
      </div>
      <div className="mt-4 flex text-center">
        <h3 className="sr-only">Website</h3>
        <RiComputerFill color='green'/>
        <p className='pl-2 overflow-x-auto'>
          <a href={campingData.homepage || "#"}>{campingData.homepage || "웹사이트 정보가 없습니다"}</a>
        </p>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">캠핑장 현황</h3>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          <span className="text-gray-600">{campingData.manageSttus || "관리 상태 정보가 없습니다"}</span>
        </div>
      </div>
      <div className='mt-10 grid grid-cols-2 gap-3 mb-10'>
        <div
          className="w-full text-center items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          {
            (campingData.resve_url || campingData.homepage) ? (
              <a href={campingData.resve_url || campingData.homepage}>
                <div className='w-full'>예약하러가기</div>
              </a>
            ) : (
              <div className='w-full'>예약 홈페이지가 없습니다</div>
            )
          }
        </div>
        <div className='flex w-full items-center justify-center font-medium rounded-md shadow-md hover:bg-blue-gray-50 hover:cursor-pointer'>
          <CampLikeButton campId={contentId} memberemail={email} />
        </div>
      </div>
      <ReviewList contentId={contentId} />
      <ReviewWrite contentId={contentId} />
    </div>
  );
};

export default CampingInfo;
