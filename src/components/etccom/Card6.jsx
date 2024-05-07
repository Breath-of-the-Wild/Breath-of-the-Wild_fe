import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Card6() {
  const [campingData, setCampingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apis.data.go.kr/B551011/GoCamping/basedList', {
          params: {
            numOfRows: 5000,
            pageNo: 1, // 페이지 번호 설정
            MobileOS: 'WIN',
            MobileApp: '22',
            serviceKey: 'lzGvqDf5E5TR4COdKFCVs/8cc/NaPzSTIRWyXjR2AlJAJMn0O0aKlspa8XwDBDYcOPpWuV1v7ZLRCyj9mgNkqw==',
            _type: 'json',
          },
        });

        // 데이터가 제대로 반환되었는지 확인
        if (response.data && response.data.response && response.data.response.body) {
          const data = response.data.response.body;
          // item이 배열인지 확인
          if (Array.isArray(data.items.item)) {
            setCampingData(data.items.item);
          } else if (data.items.item) {
            // item이 배열이 아니라면 배열로 변환하여 저장
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

  return (
    <div>
      <h1>Camping Data</h1>
      <ul>
        {campingData.map((camp) => (
          <li key={camp.contentId}>
            <h2>캠핑장 이름 : {camp.facltNm}</h2>
            <p>설명 : {camp.lineIntro}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card6;
