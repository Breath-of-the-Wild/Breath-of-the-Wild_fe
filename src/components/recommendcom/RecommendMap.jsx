import React, { useEffect } from 'react';
import geojson from '@/data/sido';

const PollutionMap = () => {

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
        level: 14,
      };

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

        kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
          polygon.setOptions({ fillColor: '#09f' });
        //   customOverlay.setContent('<div class="area">' + name + '</div>');
          customOverlay.setPosition(mouseEvent.latLng);
          customOverlay.setMap(map);
        });

        kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
          customOverlay.setPosition(mouseEvent.latLng);
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({ fillColor: '#fff' });
          customOverlay.setMap(null);
        });

        kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
          const content =
            '<div style="padding:2px;"><p><b>' +
            name +
            '</div>';
          infowindow.setContent(content);
          infowindow.setPosition(mouseEvent.latLng);
          infowindow.setMap(map);
        });
      };

      data.forEach((val) => {
        let coordinates = val.geometry.coordinates;
        let name = val.properties.SIG_KOR_NM;

        displayArea(coordinates, name);
      });
    };
  }, []);

  return (
    <div id="pollution-map" style={{ width: '100%', height: '400px' }}>
      {/* This div will be used as a container for the map */}
    </div>
  );
};

export default PollutionMap;
