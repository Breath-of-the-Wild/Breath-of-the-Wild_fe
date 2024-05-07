import React from 'react';
import {
    Typography,
    } from "@material-tailwind/react";

    import routes from '@/routes';

const MypageTop = () => {
    // 현재 경로를 가져옵니다.
    const currentPath = window.location.pathname;

    // routes 배열에서 현재 경로에 해당하는 라우트 객체를 찾습니다.
    const currentRoute = routes.find(route => currentPath === route.path);

    // 라우트 객체가 있고, 해당 라우트의 이름이 있다면 이름을 가져옵니다.
    const name = currentRoute && currentRoute.name ? currentRoute.name : '';
    return (
    <div className="ml-auto mr-auto w-full px-4 text-center background_image">
        <div className="relative flex h-full content-center items-center justify-center pb-50">
            <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto my-auto">
                <Typography
                variant="h1"
                color="white"
                className="font-White "
                >
                {name}
                </Typography>
                <div className="mt-6 flex justify-center">
                <Typography
                variant='h5'
                color='gray'
                >
                홈 {'>'}
                </Typography>
                <Typography
                variant='h5'
                color='white'
                >
                &nbsp; 마이페이지
                </Typography>
                </div>
            </div>
        </div>
        </div>
    </div>
        
    );
};

export default MypageTop;