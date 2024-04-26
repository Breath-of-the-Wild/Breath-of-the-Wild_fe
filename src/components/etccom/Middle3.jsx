import React from 'react';
import {
    Card,
    Typography,
  } from "@material-tailwind/react";
  import { PageTitle, Footer } from "@/widgets/layout";
  import { contactData } from "@/data";

const Middle3 = () => {
    return (
<section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="페이징" heading="캠핑장 추천">
           캠핑장 추천 목록
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>

         
        </div>
      </section>
    );
};

export default Middle3;