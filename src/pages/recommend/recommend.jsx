import React, { useState, useEffect } from 'react';


import RecommendTop from '@/components/recommendcom/RecommendTop';
import RecommendBody from '@/components/recommendcom/RecommendBody';


export function Recommend() {
  
  return (
    <div>
      <RecommendTop />
      <RecommendBody />
    </div>
  );
};

export default Recommend;
