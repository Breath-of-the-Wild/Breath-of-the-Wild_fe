import React, { useState, useEffect } from 'react';

function FestivalList() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    // Festival 정보를 가져오는 함수
    const fetchFestivals = async () => {
      try {
        // Spring Boot 서비스의 API 엔드포인트 주소
        const apiUrl = 'http://localhost:8080/api/board/list'; // 해당 엔드포인트에 맞게 수정 필요

        // fetch를 사용하여 API에 GET 요청 보내기
        const response = await fetch(apiUrl);

        // JSON 형태로 응답 받기
        const data = await response.json();

        // 가져온 Festival 정보 설정
        setFestivals(data);
      } catch (error) {
        console.error('Error fetching festivals:', error);
      }
    };

    // 페이지 로딩 시 Festival 정보 가져오기
    fetchFestivals();
  }, []);

  return (
    <div>

      <h2>Festivals</h2>
      <ul>
        {/* Festival 정보를 리스트로 표시 */}
        {festivals.map((festival) => (
          <li key={festival.id}>
            <h3>{festival.name}</h3>
            <p>{festival.description}</p>
            {/* 필요한 다른 정보들도 추가로 표시 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FestivalList;
