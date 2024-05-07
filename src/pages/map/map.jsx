
import MapTop from '@/components/mapcom/MapTop';

import { Outlet, useNavigate } from "react-router-dom";
import './map.css'
import React from 'react';
import { useCallback } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import MaplistPage from './MapListPage';
import Card6 from '@/components/etccom/Card6';

const Map = () => {

    const navigate = useNavigate()
    

    return (
        <div>
             <MapTop />
             <MaplistPage />
    
        </div>
    );
};

export default Map;