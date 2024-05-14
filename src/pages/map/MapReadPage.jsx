import ReadTop from '@/components/mapcom/ReadTop';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


const MapReadPage = () => {


  const handleButtonClick = () => {
    window.location.href = 'https://www.naver.com';
  };


  const { contentId } = useParams();

  const [campingData, setCampingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apis.data.go.kr/B551011/GoCamping/basedList', {
          params: {
            numOfRows: 4000,
            pageNo: 1,
            MobileOS: 'WIN',
            MobileApp: '22',
            serviceKey: 'lzGvqDf5E5TR4COdKFCVs/8cc/NaPzSTIRWyXjR2AlJAJMn0O0aKlspa8XwDBDYcOPpWuV1v7ZLRCyj9mgNkqw==',
            _type: 'json',
          },
        });

        if (response.data && response.data.response && response.data.response.body) {
          const data = response.data.response.body;
          if (Array.isArray(data.items.item)) {
            setCampingData(data.items.item);
          } else if (data.items.item) {
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

  // contentId가 10인 데이터를 찾기
  const dataWithContentId = campingData.find(item => item.contentId === contentId);

  return (
    <div>
      <ReadTop />
      {/* contentId가 10인 데이터가 있을 경우에만 렌더링 */}
      {dataWithContentId && (
        <div>

    





          <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {dataWithContentId.facltNm}

    
          </div>
        </nav>

        {/* Image gallery */}
          <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    
            <img
              src={dataWithContentId.firstImageUrl}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
        


        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{dataWithContentId.facltNm}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{dataWithContentId.induty}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a.75.75 0 01.672.41l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 14.16l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.192L.82 6.117a.75.75 0 01.416-1.28l4.21-.611L9.328 1.41A.75.75 0 0110 1zm0 2.445L8.615 6.29a.75.75 0 01-.564.41l-3.095.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.095-.45a.75.75 0 01-.564-.41L10 3.444v.001z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} 리뷰
                </a>
              </div>
            </div>

            <form className="mt-10">
      

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">세부사항</h3>
                  <a href="{dataWithContentId.homepage}" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    관심매물추가
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
               
        
              
               
     
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>
                      <span className="text-gray-600">{dataWithContentId.manageSttus}</span>

                </div>
              </div>
              <a href="{dataWithContentId.homepage}">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleButtonClick}>
               예약하기
              </button>
              </a>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{dataWithContentId.intro}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">특징</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              
                    <li className="text-gray-400">
                      <span className="text-gray-600">{dataWithContentId.glampInnerFclty}</span>
                      </li>
                      <li className="text-gray-400">
                      <span className="text-gray-600">{dataWithContentId.caravInnerFclty}</span>
                      </li>
                      <li className="text-gray-400">
                      <span className="text-gray-600">운영기간 : {dataWithContentId.operPdCl}</span>
                      </li>
                      <li className="text-gray-400">
                      <span className="text-gray-600">운영일 : {dataWithContentId.operDeCl}</span>
                      </li>
                      <li className="text-gray-400">
                      <span className="text-gray-600">{dataWithContentId.sbrsCl}</span>
                      </li>
                      <li className="text-gray-400">
                      <span className="text-gray-600">{dataWithContentId.posblFcltyCl}</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">{dataWithContentId.themaEnvrnCl}</span>
                    </li>
           
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">상세내용</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{dataWithContentId.intro}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





















        </div>
     )}
    </div>
  );
};

export default MapReadPage;
