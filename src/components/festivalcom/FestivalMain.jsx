import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 기존의 generatePosts 함수는 필요하지 않습니다.

// Post 컴포넌트는 그대로 유지합니다.
const Post = ({ post }) => (
  <article className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
    <Link to={post.slug} className="absolute top-0 right-0 left-0 bottom-0 opacity-0" />
    <div className="relative mb-4 rounded-2xl">
      <img
        alt={post.title}
        className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
        src={post.firstimage}
      />
  
      <Link
        to={post.slug}
        className="flex justify-center items-center bg-red-700 bg-opacity-80 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100"
      >
        Read article111
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
    <h3 className="font-medium text-xl leading-8">
      <Link className="block relative group-hover:text-red-700 transition-colors duration-200" to={post.slug}>
        {post.title}
      </Link>
    </h3>
    <div className="flex justify-between items-center pb-4">
      <div className="flex items-center">
        <img alt={post.title} className="h-12 w-12 rounded-full object-cover" src={post.firstimage} />
        <div className="ml-3">
          <p className="text-sm font-semibold">{post.eventstartdate} ~ {post.eventenddate}</p>
          <p className="text-sm text-gray-500 flex">
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
            {post.addr1}
          </p>
        </div>
      </div>
      <div className="flex justify-end text-sm text-gray-500">
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

const BlogPosts = () => {
    // 상태 변수 선언
    const [posts, setPosts] = useState([]);

    // 컴포넌트가 마운트될 때 API에서 데이터를 가져오는 useEffect 훅 사용
    useEffect(() => {
        // API URL
        const apiUrl = 'https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=12&pageNo=1&MobileOS=win&MobileApp=win&_type=json&arrange=Q&eventStartDate=20240401&serviceKey=tkpuYMyOJPiESQhzLecE1EshwjeUNeXfOJY7y8Rku7L2kh5E%2FbSH7NC7CZ1vvthRi72%2FidxEOUL%2FULnq0WWkHw%3D%3D';

        // API 호출을 위한 axios를 사용
        axios.get(apiUrl)
            .then(response => {
                // API 응답을 받아서 posts 상태를 업데이트
                setPosts(response.data.response.body.items.item);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 API 호출

    return (
        <div className="relative pt-2 lg:pt-2 min-h-screen">
            <div className="bg-cover w-full flex justify-center items-center" style={{ backgroundImage: 'url(\'/images/mybackground.jpeg\')' }}>
                <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                    <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
                            {posts.map((post, index) => (
                                <Post key={index} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPosts;
