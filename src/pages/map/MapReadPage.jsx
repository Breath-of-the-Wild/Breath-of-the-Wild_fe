import Top from "@/components/top/Top";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Typography } from '@material-tailwind/react';
import MapMarker from '@/components/mapcom/MapMarker';
import { FaTag } from "react-icons/fa";
import SearchF from '@/components/mapcom/SearchF';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const reviews = { href: '#', average: 4, totalCount: 117 };

const MapReadPage = () => {

  const { contentId } = useParams();

  const [campingData, setCampingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apis.data.go.kr/B551011/GoCamping/basedList', {
          params: {
            numOfRows: 4000,
            pageNo: 1,
            MobileOS: 'WIN',
            MobileApp: '22',
            serviceKey: 'THdy3Wa2gPc/hA6UmjpvfZ087NbuDZ2NfuvNd/gLStW1jA+ViMfbfdYIdyX8upEoV16D9YRMZk7SEnU5FQcY7Q==',
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

  // contentId가 10인 데이터를 찾기
  const dataWithContentId = campingData.find(item => item.contentId === contentId);

  function ConditionalLi({ data }) {
    if (data.length === 0) {
      return null; // 길이가 0이면 null을 반환하여 아무것도 렌더링하지 않음
    }
  
    return (
      <li className="text-gray-400">
        <span className="text-gray-600">{data}</span>
      </li>
    );
  }

  return (
    <div>
      <Top title='mapread' />
      {/* contentId가 10인 데이터가 있을 경우에만 렌더링 */}
      {dataWithContentId && (
        <div>

    <div className="bg-white">
      <div className="pt-6">
        
        {/* 사진 */}
          <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <img
              src={dataWithContentId.firstImageUrl.length > 0 ? dataWithContentId.firstImageUrl : "img/camp/camp.jpg"}
              className="h-full w-full object-cover object-center"
            />
          </div>

        {/* 이름 */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <Typography
            variant='h2'>
              {dataWithContentId.facltNm}
            </Typography>
            
          </div>

          
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <div className='flex gap-5'>
              {/* 업종 */}
            <div className='flex text-center'>
            <FaTag color='green'/>
            <Typography
            variant='h4'
            color='gray'>
              {dataWithContentId.induty}
            </Typography>
            </div>

            {/* 환경 */}
            <div className='flex text-center'>
            <FaTag color='green'/>
            <Typography
            variant='h4'
            color='gray'>
              {dataWithContentId.lctCl}
            </Typography>
            </div>
            </div>

            {/* 리뷰 */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a.75.75 0 01.672.41l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 14.16l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.192L.82 6.117a.75.75 0 01.416-1.28l4.21-.611L9.328 1.41A.75.75 0 0110 1zm0 2.445L8.615 6.29a.75.75 0 01-.564.41l-3.095.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.095-.45a.75.75 0 01-.564-.41L10 3.444v.001z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} 리뷰
                </a>
              </div>
            </div>

                    {/* 주소 */}
                    <div className="mt-10 flex text-center">
                    <h3 className="sr-only">Adress</h3>
                    <FaLocationDot color='green'/><p className='pl-2'>{dataWithContentId.addr1}</p>
                    </div>

                    {/* 전화 */}
                    <div className="mt-4 flex text-center">
                    <h3 className="sr-only">Number</h3>
                    <FaPhoneAlt color='green'/><p className='pl-2'>{dataWithContentId.tel}</p>
                    </div>

                    {/* 사이트 */}
                    <div className="mt-4 flex text-center">
                    <h3 className="sr-only">Wepsite</h3>
                    <RiComputerFill color='green'/><p className='pl-2'><a href={dataWithContentId.homepage}>{dataWithContentId.homepage}</a></p>
                    </div>

            <form className="mt-10">
    
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">세부사항</h3>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
               
        
              
               
     
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>

                </div>
              </div>

              <div className='mt-10 grid grid-cols-2 gap-3'>
              <a href={dataWithContentId.resveUrl}>
              <button
                type="submit"
                className="w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
               예약하러가기
              </button>
              </a>
              <button className='flex w-full items-center justify-center font-medium rounded-md shadow-md hover:bg-blue-gray-50'><FaRegHeart /><p className='p-2'>찜하기</p></button>
              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* 짧은 소개 */}
                  <div>
                    <h3 className="sr-only">LineIntro</h3>
                    <Typography
                    variant='h4'
                    color='green'
                    >
                    {dataWithContentId.lineIntro.length > 0 ? `<${dataWithContentId.lineIntro}>` : ""}
                    </Typography>
                  </div>
                  <hr className='my-10'/>

            {/* 상세소개 */}
            <div>
              <h3 className="sr-only">Description</h3>
              <Typography
              variant='h5'
              className='m-3'
              color='green'
              >
                캠핑장 소개
              </Typography>
              {dataWithContentId.intro.length > 0 ? <div className="space-y-6 p-6 border-2 border-gray-100 rounded-lg">{dataWithContentId.intro}</div> : ""}
            </div>
            <hr className='my-10'/>

                  {/* 특징 */}
            <div className="mt-10">
              <Typography
              variant='h5'
              className='m-3'
              color='green'
              >
                특징
              </Typography>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <ConditionalLi data={dataWithContentId.glampInnerFclty} />
                <ConditionalLi data={dataWithContentId.caravInnerFclty} />
                <ConditionalLi data={dataWithContentId.operPdCl} />
                <ConditionalLi data={dataWithContentId.glampInnerFclty} />
                <ConditionalLi data={dataWithContentId.operDeCl} />
                <ConditionalLi data={dataWithContentId.sbrsCl} />
                <ConditionalLi data={dataWithContentId.posblFcltyCl} />
                <ConditionalLi data={dataWithContentId.themaEnvrnCl} />
                </ul>
              </div>
            </div>
<hr className='my-10'/>

                  {/* 지도 */}
            <div className="mt-10">
            <Typography
              variant='h5'
              className='m-3'
              color='green'
              >
                지도
              </Typography>

              <div className="mt-4 space-y-6">
                  <MapMarker latitude={dataWithContentId.mapY} longitude={dataWithContentId.mapX}/>
                  <p>{dataWithContentId.addr1}</p>
              </div>
            </div>
            <hr className='my-10'/>

                  {/* 축제 */}
            <div className="mt-10">
            <Typography
              variant='h5'
              className='m-3'
              color='green'
              >
                주변 관광지 및 지역 축제
              </Typography>
              <div>
                <SearchF searchData={dataWithContentId.sigunguNm}/>
                  </div>
                  
              </div>

          </div>
        </div>
      </div>
    </div>

        </div>
     )}
    </div>
  );
};

export default MapReadPage;
