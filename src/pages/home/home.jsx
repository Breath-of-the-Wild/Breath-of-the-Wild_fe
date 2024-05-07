
import './home.css'

import Top from '@/components/homecom/Top';
import FeatureCard1 from '@/components/homecom/FeatureCard1';
import Camp2 from '@/components/homecom/Camp2';
import Camp1 from '@/components/homecom/Camp1';
import Camp0 from '@/components/homecom/Camp0';
import BestReview from '@/components/homecom/BestReview';
import Card6 from '@/components/etccom/Card6';


export function Home() {



  return (
    <>

          <Top />
          <Camp0 />
          <Camp1 />
          <Camp2 />
          <FeatureCard1 />
          <BestReview />
     
    </>
  );
}

export default Home;
