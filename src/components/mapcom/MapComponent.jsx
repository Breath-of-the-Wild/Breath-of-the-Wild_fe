import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    // 지도 생성
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c87b1b56363f99ac8f96e46e2cefe04c`;
    document.head.appendChild(script);
    
    script.onload = () => {
      // Kakao 지도 API 로드 후 실행될 코드
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      const map = new window.kakao.maps.Map(mapContainer, options); // 지도 생성 및 객체 리턴
    };

    return () => {
      // 컴포넌트가 언마운트 되면 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" className='kakaomap'></div>;
};

export default MapComponent;