import React, { useState } from 'react';

const MapReadComponent = () => {
  const [shippingVisible, setShippingVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const toggleShipping = () => {
    setShippingVisible(!shippingVisible);
  };

  const toggleContact = () => {
    setContactVisible(!contactVisible);
  };

  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img className="w-full" alt="image of a girl posing" src="/public/img/camp/camp2.jpg" />
        <img className="mt-6 w-full" alt="image of a girl posing" src="/public/img/camp/camp3.jpg" />
      </div>
      <div className="md:hidden">
        <img className="w-full" alt="image of a girl posing" src="https://i.ibb.co/QMdWfzX/component-image-one.png" />
        <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
          <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
          <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
          <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/cYDrVGh/Rectangle-245.png" />
          <img alt="image-tag-one" className="md:w-48 md:h-48 w-full" src="https://i.ibb.co/f17NXrW/Rectangle-244.png" />
        </div>
      </div>
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">강원도 홍천군</p>
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">화산 캠핑장</h1>
        </div>
        <div className="py-4 border-b flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">010-2313-0577</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">찜하기</p>
            <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"></div>
            <svg className="cursor-pointer text-gray-300 dark:text-white" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="py-4 border-b  flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800 dark:text-gray-300">추가</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">38.2</p>
            <svg className="text-gray-300 dark:text-white cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div>
          <h1 className="xl:pr-48 text-base lg:leading-tight leading-normal mt-7">운영정책</h1>
          <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">땡큐캠핑양도가능</p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Q-Point사용가능</p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">매너타임시작 22:00종료 08:00</p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">오토캠핑입실 14:00퇴실 13:00</p>
          <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">펜션입실 14:00퇴실 13:00</p>
        </div>

        
        <div>
          <h1 className="xl:pr-48 text-base lg:leading-tight leading-normal mt-7">공지사항</h1>
          <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">땡큐캠핑양도가능</p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Q-Point사용가능</p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">매너타임시작 22:00종료 08:00</p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">오토캠핑입실 14:00퇴실 13:00</p>
          <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">펜션입실 14:00퇴실 13:00</p>
        </div>
        <div>
          <div className="border-t border-b py-4 mt-7 border-gray-200">
            <div data-menu className="flex justify-between items-center cursor-pointer" onClick={toggleShipping}>
              <p className="text-base leading-4 text-gray-800 dark:text-gray-300">주의사항</p>
              <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" role="button" aria-label="show or hide">
                <svg className={`transform ${shippingVisible ? 'rotate-180' : ''} text-gray-300 dark:text-white`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L5 5L1 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={`${shippingVisible ? '' : 'hidden'} pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300`}>주의사항 입력</div>
          </div>
        </div>
        <div>
          <div className="border-b py-4 border-gray-200">
            <div data-menu className="flex justify-between items-center cursor-pointer" onClick={toggleContact}>
              <p className="text-base leading-4 text-gray-800 dark:text-gray-300">문의사항</p>
              <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" role="button" aria-label="show or hide">
                <svg className={`transform ${contactVisible ? 'rotate-180' : ''} text-gray-300 dark:text-white`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L5 5L1 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
            </div>
            
            
            <div className={`${contactVisible ? '' : 'hidden'} pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 dark:text-gray-300`}> 문의 사항 입력</div>
          
          </div>

          <button className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 w-full py-4 hover:bg-gray-700 focus:outline-none">
          <svg className="mr-3 text-white dark:text-gray-900" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.66699 4.83333V4.84166" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.333 11.5V11.5083" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
         예약하기
        </button>
        </div>
      </div>
    </div>
  );
};

export default MapReadComponent;