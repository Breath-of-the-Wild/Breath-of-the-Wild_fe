import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";

const Middle1 = () => {
    return (
 


         
         
          
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.png"
                    className="h-full w-full"
                  />
                  
                </CardHeader>
                
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">강원 횡성군 공근면 도곡로14번길 61 (도곡리)</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    솔밭체육공원오토캠핑장
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                  안녕하세요 솔밭체육공원 캠핑장입니다.

                  </Typography>
                </CardBody>
              </Card>

         
              
            </div>
         
       
    );
};

export default Middle1;