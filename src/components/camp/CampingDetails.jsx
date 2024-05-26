import React from 'react';
import { Typography } from '@material-tailwind/react';
import MapMarker from '@/components/mapcom/MapMarker';
import SearchF from '@/components/mapcom/SearchF';

const CampingDetails = ({ campingData }) => {
  const ConditionalLi = ({ data }) => {
    if (data.length === 0) {
      return null;
    } else {
      return <li>{data}</li>;
    }
  };

  return (
    <div>
      <div>
        <h3 className="sr-only">LineIntro</h3>
        <Typography variant='h4' color='green'>
          {campingData.lineIntro || "간략한 소개가 없습니다"}
        </Typography>
      </div>
      <hr className='my-10'/>
      <div>
        <h3 className="sr-only">Description</h3>
        <Typography variant='h5' className='m-3' color='green'>
          캠핑장 소개
        </Typography>
        <div className="space-y-6 p-6 border-2 border-gray-100 rounded-lg">
          {campingData.intro || "캠핑장 소개가 없습니다"}
        </div>
      </div>
      <hr className='my-10'/>
      <div className="mt-10">
        <Typography variant='h5' className='m-3' color='green'>
          특징
        </Typography>
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            <ConditionalLi data={campingData.glampInnerFclty} />
            <ConditionalLi data={campingData.caravInnerFclty} />
            <ConditionalLi data={campingData.operPdCl} />
            <ConditionalLi data={campingData.glampInnerFclty} />
            <ConditionalLi data={campingData.operDeCl} />
            <ConditionalLi data={campingData.sbrsCl} />
            <ConditionalLi data={campingData.posblFcltyCl} />
            <ConditionalLi data={campingData.themaEnvrnCl} />
          </ul>
        </div>
      </div>
      <hr className='my-10'/>
      <div className="mt-10">
        <Typography variant='h5' className='m-3' color='green'>
          지도
        </Typography>
        <div className="mt-4 space-y-6">
          {campingData.mapY && campingData.mapX ? (
            <MapMarker latitude={campingData.mapY} longitude={campingData.mapX}/>
          ) : (
            <p>지도 정보가 없습니다</p>
          )}
          <p>{campingData.addr1 || "주소 정보가 없습니다"}</p>
        </div>
      </div>
      <hr className='my-10'/>
      <div className="mt-10">
        <Typography
          variant='h5'
          className='m-3'
          color='green'
        >
          주변 관광지 및 지역 축제
        </Typography>
        <div>
          <SearchF searchData={campingData.sigunguNm || "정보가 없습니다"}/>
        </div>
      </div>
    </div>
  );
};

export default CampingDetails;
