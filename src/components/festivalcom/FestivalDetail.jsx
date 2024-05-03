import FestivalTop from "./FestivalTop";
import React from 'react';

// FestivalDetail 컴포넌트: 페스티벌 세부 정보를 보여주는 컴포넌트
const FestivalDetail = () => {
  return (
    <>
      <FestivalTop />
      <SignInPage />
    </>
  );
};

// SignInForm 컴포넌트: 로그인 폼을 나타내는 컴포넌트
const SignInForm = () => {
  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            축제명
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text" 
          readOnly 
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            요금
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text" 
          readOnly 
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            개최지역
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text" 
          readOnly 
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            개최기간
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text" 
          readOnly 
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            연락처
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text" 
          readOnly 
        />
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            사이트 주소
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text" 
          readOnly 
        />
      </div>
      <div className="mt-8">
        <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
            사이트 바로가기 
        </button>
      </div>
    </div>
  );
};

// SignInCard 컴포넌트: 로그인 카드 레이아웃을 나타내는 컴포넌트
const SignInCard = () => {
  return (
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-6xl">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover"
        style={{
          backgroundImage:
            'url(\'https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80\')', // 배경 이미지
        }}
      />
      <div className="w-full p-8 lg:w-1/2">
        <SignInForm /> 
      </div>
    </div>
  );
};

// SignInPage 컴포넌트: 로그인 페이지를 나타내는 컴포넌트
const SignInPage = () => {
  return (
    <div className="py-6">
      <SignInCard /> 
    </div>
  );
};

// FestivalDetail 컴포넌트를 기본 내보내기로 내보냄
export default FestivalDetail;
