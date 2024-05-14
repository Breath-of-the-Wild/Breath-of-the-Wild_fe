import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../data/store';
import {  useParams } from 'react-router-dom';
import FestivalTop from './FestivalTop';

// FestivalDetail 컴포넌트: 페스티벌 세부 정보를 보여주는 컴포넌트
const FestivalDetail = () => {
    const dispatch = useDispatch();
    
    // Redux 상태에서 posts 데이터를 가져옴
    const { posts, status, error } = useSelector((state) => state.posts);

    const {contentid} = useParams();
    console.log('contentid:', contentid); // 디버깅을 위해 추가
    console.log('posts:', posts); // 디버깅을 위해 추가


    // 컴포넌트가 마운트될 때 페스티벌 데이터를 가져오기 위한 액션 호출
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // 상태에 따른 렌더링
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

  // API에서 받은 데이터 중 ID가 일치하는 객체 찾기
  const matchingPost = posts.find(post => post.contentid === contentid);
  console.log('matchingPost:', matchingPost); // 디버깅을 위해 추가

    // `matchingPost`가 없을 경우, 메시지 표시
    if (!matchingPost) {
      return <div>No matching post found.</div>;
  }

    // 상태가 succeeded인 경우 페스티벌 데이터를 렌더링
    return (
        <>
            <FestivalTop />
            <SignInPage matchingPost={matchingPost} />
        </>
    );
};//end of FestivalDetail

// 날짜 형식 변환 함수
function formatDate(dateString) {
  // YYYYMMDD 형식의 문자열을 파싱하여 Date 객체 생성
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  
  // Date 객체 생성
  const date = new Date(year, month - 1, day);
  
  // 년도, 월, 일을 YYYY-MM-DD 형식으로 변환
  const formattedDate = date.toISOString().split('T')[0];
  
  return formattedDate;
}



// SignInForm 컴포넌트: 로그인 폼을 나타내는 컴포넌트
const SignInForm = ({matchingPost}) => {
   // `formatDate` 함수를 사용하여 날짜 형식 변환
   const formattedStartDate = formatDate(matchingPost.eventstartdate);
   const formattedEndDate = formatDate(matchingPost.eventenddate);
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
          placeholder={matchingPost.title}
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
          placeholder={matchingPost.addr1}
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
            // 날짜 형식을 YYYY-MM-DD로 변환하여 표시
            placeholder={`${formattedStartDate}~${formattedEndDate}`}
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
          placeholder={matchingPost.tel} 
        />
      </div>
  
    </div>
  );
};//end of SignInForm

// SignInCard 컴포넌트: 로그인 카드 레이아웃을 나타내는 컴포넌트
const SignInCard = ({matchingPost}) => {
  console.log('matchingPost.firstimage2:', matchingPost.firstimage2);
  const imgStyle = {
    backgroundImage: `url(${matchingPost.firstimage})`,
};

  return (
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-6xl">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover"
        style={imgStyle}
      />
      <div className="w-full p-8 lg:w-1/2">
        <SignInForm matchingPost={matchingPost} /> 
      </div>
    </div>
  );
};//end of SignInCard

// SignInPage 컴포넌트: 로그인 페이지를 나타내는 컴포넌트
const SignInPage = ({matchingPost}) => {
  return (
    <>
    <div className="py-6">
      <SignInCard matchingPost={matchingPost}/> 
    </div>
    </>
  );
};//end of SingInPage

// FestivalDetail 컴포넌트를 기본 내보내기로 내보냄
export default FestivalDetail;
