'use client';

import { memo } from 'react';
import MainTemplate from '@/components/templates/MainTemplate';
import HomeHeader from '@/components/molecules/HomeHeader';
import HomeMenu from '@/components/organisms/HomeMenu';

const Page = () => (
  <>
    <MainTemplate>
      <HomeHeader />
      <HomeMenu />
    </MainTemplate>
  </>
);

export default memo(Page);
