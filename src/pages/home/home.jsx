import './home.css'
import Top from '@/components/homecom/Top';
import FeatureCard1 from '@/components/homecom/FeatureCard1';
import BestReview from '@/components/homecom/BestReview';

export function Home() {
  return (
    <>
          <Top />
          <FeatureCard1 />
          <BestReview />
          <BestReview />
          <BestReview />
    </>
  );
}

export default Home;
