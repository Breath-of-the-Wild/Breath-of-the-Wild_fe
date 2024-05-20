import FestivalMain from '@/components/festivalcom/FestivalMain';
import React from 'react';
import Top from '@/components/top/Top';
import FestivalList from '@/components/festivalcom/FestivalList';

const Festival = () => {
    return (
        <div>
            <Top title='festival' />
            <FestivalMain />
        </div>
    );
};

export default Festival;