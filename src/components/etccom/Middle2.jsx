import React from 'react';
import {
    IconButton,
  } from "@material-tailwind/react";
  import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
  import { PageTitle, Footer } from "@/widgets/layout";
  import { FeatureCard, TeamCard } from "@/widgets/cards";
  import { featuresData, teamData, contactData } from "@/data";
  
const Middle2 = () => {
    return (
<section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="인기 있는리뷰" heading="인기 있는리뷰">
            캠핑 고수들이 자주 방문한 캠핑장 리뷰
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
    );
};

export default Middle2;