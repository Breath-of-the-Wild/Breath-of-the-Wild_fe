import './home.css'
import Top from '@/components/homecom/Top';
import FeatureCard1 from '@/components/homecom/FeatureCard1';
import BestReview from '@/components/homecom/BestReview';
import BestRecommend from '@/components/homecom/BestRecommend';
import BestFestival from '@/components/homecom/BestFestival';

export function Home() {
  return (
    <>
          <Top />
          
          
          <FeatureCard1 />
          <BestRecommend />
          <BestFestival />
          <BestReview />
          <BestReview />
    </>
  );
}

export default Home;
