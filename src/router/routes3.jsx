import React from 'react';
import Recommend from '@/pages/recommend/recommend';
import OAuth2Callback from '@/components/signincom/OAuth2Callback';
import OAuth2RedirectHandler from '@/components/signincom/OAuth2RedirectHandler';

const routes3 = [
    {
        path: "/recommend/:selectedStartDate/:selectedEndDate",
        element: <Recommend />,
    },
    {
        path: "/oauth2",
        element: <OAuth2Callback />,
      },
      {
        path: "/oauth2/redirect",
        element: <OAuth2RedirectHandler />,
        
      },
  
];

export default routes3;
