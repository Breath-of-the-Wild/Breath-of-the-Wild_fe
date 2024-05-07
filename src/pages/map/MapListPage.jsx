import MapComponent from '@/components/mapcom/MapComponent';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapTop from '@/components/mapcom/MapTop';
import MapList2 from '@/components/mapcom/MapList2';
import MapList from '@/components/mapcom/Maplist';

const MaplistPage = () => {

    const [shippingVisible, setShippingVisible] = useState(false);
    const [contactVisible, setContactVisible] = useState(false);
  
    const toggleShipping = () => {
      setShippingVisible(!shippingVisible);
    };
  
    const toggleContact = () => {
      setContactVisible(!contactVisible);
    };

    

    return (
        <div>
        
        <div className='flex w-full h-1000'>
        <MapComponent />
         <MapList />
         </div>
         </div>
    );
};

export default MaplistPage;