import React, { useState, useEffect } from 'react';


import RecommendTop from '@/components/recommendcom/RecommendTop';
import Camp2 from '@/components/homecom/Camp2';
import Camp1 from '@/components/homecom/Camp1';
import Camp0 from '@/components/homecom/Camp0';
import FeatureCard1 from '@/components/homecom/FeatureCard1';


export function Recommend() {
  
  return (
            <div>
                <RecommendTop />
                <FeatureCard1 />
                <Camp0/>
                <Camp1/>
                <Camp2/>
          
      </div>

  );
};

export default Recommend;
