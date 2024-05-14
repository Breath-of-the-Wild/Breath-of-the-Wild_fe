import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Post 컴포넌트: 각 축제 포스트를 나타내는 컴포넌트입니다.
const Post = ({ post }) => (
    
    <article className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
        {/* 축제 세부 정보를 보여주는 링크 */}
        <Link to={`/detail/${post.contentid}`} className="absolute top-0 right-0 left-0 bottom-0 opacity-0" />
        {/* 축제 이미지 */}
        <div className="relative mb-4 rounded-2xl">
            <img
                alt={post.title}
                className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                src={post.firstimage}
            />
            {/* 이미지 위의 축제 보러가기 버튼 */}
            <Link
                to={`/detail/${post.contentid}`}
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
            <Link className="block relative group-hover:text-red-700 transition-colors duration-200" to={`/detail/${post.contentid}`}>
                {post.title}
            </Link>
        </h3>
        {/* 축제 세부 정보 */}
        <div className="flex justify-between items-center pb-4">
            <div className="flex items-center">
                {/* 축제 이미지 */}
                <img alt={post.title} className="h-12 w-12 rounded-full object-cover" src={post.firstimage} />
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
                {formatDate(post.eventstartdate)} ~ {formatDate(post.eventenddate)}
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
                {post.addr1}
            </div>
        </div>
    </article>
);

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

const BlogPosts = () => {
    // 상태 관리: 포스트, 전체 포스트, 페이지 번호, 로딩 상태, 검색 쿼리
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // 축제 게시물을 가져오는 함수
    const fetchPosts = async () => {
        setLoading(true); // 로딩 상태 시작
        const apiUrl = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=12&pageNo=${pageNo}&MobileOS=win&MobileApp=win&_type=json&arrange=Q&eventStartDate=20240401&serviceKey=tkpuYMyOJPiESQhzLecE1EshwjeUNeXfOJY7y8Rku7L2kh5E%2FbSH7NC7CZ1vvthRi72%2FidxEOUL%2FULnq0WWkHw%3D%3D`;

        try {
            const response = await axios.get(apiUrl); // API 호출
            const newPosts = response.data.response.body.items.item;//호출한 API 데이터 추출
            
            // 첫 페이지인 경우 전체 포스트를 설정하고 초기화
            if (pageNo === 1) {
                setPosts(newPosts);
                setAllPosts(newPosts);
            } else {
                // 중복된 포스트를 제외하고 추가
                const uniqueNewPosts = newPosts.filter(post => !allPosts.some(existingPost => existingPost.contentid === post.contentid));
                // 상태 업데이트 함수
                // prevPosts는 현재 posts의 상태 즉, 현재 posts를 인자로 줌
                // 현재 posts + 더보기로 추가한 데이터
                setPosts(prevPosts => [...prevPosts, ...uniqueNewPosts]);
                setAllPosts(prevAllPosts => [...prevAllPosts, ...uniqueNewPosts]);
            }
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    // 페이지 번호 변경에 따라 포스트를 가져옵니다.
    useEffect(() => {
        fetchPosts();
    }, [pageNo]);

    // 검색 결과를 필터링합니다.
   // handleSearch 함수 수정
const handleSearch = async () => {
  // 전체 데이터를 요청하여 가져옵니다.
  const apiUrl = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=1000&pageNo=1&MobileOS=win&MobileApp=win&_type=json&arrange=Q&eventStartDate=20240401&serviceKey=tkpuYMyOJPiESQhzLecE1EshwjeUNeXfOJY7y8Rku7L2kh5E%2FbSH7NC7CZ1vvthRi72%2FidxEOUL%2FULnq0WWkHw%3D%3D`;
  
  try {
      const response = await axios.get(apiUrl);
      const allData = response.data.response.body.items.item;

      // 검색 쿼리가 있을 때 전체 데이터에서 필터링합니다.
      if (searchQuery) {
          const lowerCaseQuery = searchQuery.toLowerCase();
          const filteredPosts = allData.filter(post => post.addr1.toLowerCase().includes(lowerCaseQuery));
          setPosts(filteredPosts);
      } else {
          // 검색 쿼리가 없는 경우 전체 데이터를 표시합니다.
          setPosts(allData);
      }
  } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
  }
};


    // "더보기" 버튼 클릭 시 페이지 번호를 증가시켜 더 많은 포스트를 불러옵니다.
    const handleLoadMore = () => {
        setPageNo((prevPageNo) => prevPageNo + 1);
    };

    return (
        <div className="relative pt-2 lg:pt-2 min-h-screen">
            {/* 배경 이미지 */}
            <div className="bg-cover w-full flex justify-center items-center" style={{ backgroundImage: 'url(\'/images/mybackground.jpeg\')' }}>
                <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                    <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                        {/* 검색 바 */}
                        <div className="bg-white rounded-md shadow w-1/3 mx-auto flex -mt-20 p-5 mb-10">
                            <input
                                type="text"
                                placeholder="주소를 기준으로 검색하세요..."
                                className="p-2 border rounded flex-grow"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            {/* 검색 버튼 */}
                            <button
                                className="ml-2 py-2 px-4 bg-blue-500 text-white rounded"
                                onClick={handleSearch}
                            >
                                검색
                            </button>
                        </div>
                        {/* 포스트 그리드 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center max-w-2xl p-5 lg:max-w-7xl lg:px-8 mx-auto">
                            {posts.map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* "더보기" 버튼 */}
            <div className="flex justify-center mt-8">
                <button
                    className={`py-2 px-4 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                    onClick={handleLoadMore}
                    disabled={loading}
                >
                    {/* 로딩 중이면 스피너 표시 */}
                    {loading ? (
                        <svg
                            className="w-4 h-4 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="31.4"
                                strokeDashoffset="31.4"
                                className="path"
                            />
                        </svg>
                    ) : (
                        '더보기'
                    )}
                </button>
            </div>
        </div>
    );
};

export default BlogPosts;