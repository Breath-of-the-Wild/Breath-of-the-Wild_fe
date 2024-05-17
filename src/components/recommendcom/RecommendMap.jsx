import React, { useEffect, useState } from 'react';
import geojson from '@/data/sido';
import RecommendCard from './RecommendCard';
import RegionData from '@/data/RegionData';

const PollutionMap = () => {

  const [selectedArea, setSelectedArea] = useState(null); // 선택한 구역 정보를 담을 상태
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태를 관리하는 상태 변수

  useEffect(() => {
    let data = geojson.features;

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c87b1b56363f99ac8f96e46e2cefe04c`;
    document.head.appendChild(script);

    script.onload = () => {
      const mapContainer = document.getElementById('pollution-map');
      const mapOption = {
        center: new kakao.maps.LatLng(36.2683, 127.6358),
        level: 13,
        draggable: false //확대축소금지
      };

      // 지도생성
      const map = new kakao.maps.Map(mapContainer, mapOption);

      const customOverlay = new kakao.maps.CustomOverlay({});
      const infowindow = new kakao.maps.InfoWindow({ removable: true });

      let pollution = [];

      const displayArea = (coordinates, name) => {
        let path = [];
        let points = [];
        let areaResult = pollution.filter((item) => item[0] === name);
        console.log(areaResult);

        coordinates[0].forEach((coordinate) => {
          let point = {};
          point.x = coordinate[1];
          point.y = coordinate[0];
          points.push(point);
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });

        let polygon = new kakao.maps.Polygon({
          map: map,
          path: path,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          strokeStyle: 'solid',
          fillColor: '#fff',
          fillOpacity: 0.7,
        });

        

        kakao.maps.event.addListener(polygon, 'mouseover', function () {
          polygon.setOptions({ fillColor: '#09f' });
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({ fillColor: '#fff' });
        });

        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
          // 클릭한 폴리곤의 정보를 스테이트에 업데이트
          setSelectedArea(name);
          setModalOpen(true); // 모달 열기
          const content = '<div style="padding:2px;"><p><b>' + name + '</div>';
          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
        });

        // 마커이미지
        const imageSrc = 'https://i.ibb.co/vQYfjWb/rain-2982083.png',   
        imageSize = new kakao.maps.Size(40, 40);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커생성
        for (const item of RegionData) {
          const position = {
            latLng: new kakao.maps.LatLng(item.latitude, item.longitude)
          };
          const marker = new kakao.maps.Marker({
            map: map,
            position: position.latLng,
            image: markerImage
          });
        
          // 인포윈도우를 생성합니다.
          const iwContent = '<div style="padding:5px;">' + item.do + '<br />강수량:</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          const infowindow = new kakao.maps.InfoWindow({
            position: position.latLng,
            content: iwContent
          });
        
          // 마커에 마우스 오버 이벤트를 추가합니다.
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            // 인포윈도우를 지도 위에 표시합니다.
            infowindow.open(map, marker);
          });
        
          // 마커에 마우스 아웃 이벤트를 추가합니다.
          kakao.maps.event.addListener(marker, 'mouseout', function () {
            // 인포윈도우를 닫습니다.
            infowindow.close();
          });
        }
        

      };

      data.forEach((val) => {
        let coordinates = val.geometry.coordinates;
        let name = val.properties.SIG_KOR_NM;

        displayArea(coordinates, name);
      });
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const handleModalOutsideClick = (event) => {
    // 모달 외부를 클릭하면 모달을 닫음
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }

  };

  return (
    <div id='total'>
      <div id="pollution-map" style={{ width: '100%', height: '550px' }}>
      </div>
      
      {/* 모달 컴포넌트 */}
      {modalOpen && (
        <div className="modal-overlay" onClick={handleModalOutsideClick}>
            <RecommendCard area={selectedArea} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default PollutionMap;