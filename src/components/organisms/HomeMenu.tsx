'use client';

import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CardButton from '@/components/atmos/CardButton';

const HomeMenu = () => {
  const router = useRouter();

  const handleAI = useCallback(() => {
    router.push('/ai');
  }, [router]);

  const handleOnline = useCallback(() => {
    router.push('/online');
  }, [router]);

  return (
    <section className="mt-7 px-4 md:px-5 lg:max-w-[720px] lg:mx-auto" aria-label="메인 메뉴">
      <div
        className="
          rounded-[24px] bg-[#F5F7FB] border border-[#E7E5E4] p-[18px]
          shadow-[0_10px_28px_rgba(0,0,0,0.06)]
          sm:rounded-[28px] sm:p-[22px]
          md:rounded-[32px] md:p-[26px]
        "
      >
        <div className="grid gap-5 sm:gap-[22px]">
          <div
            className="
              p-3 bg-white/60 rounded-[20px]
              md:p-[14px] md:rounded-[22px]
            "
          >
            <CardButton title="AI와 게임하기" icon="robot" onClick={handleAI} />
          </div>
          <div
            className="
              p-3 bg-white/60 rounded-[20px]
              md:p-[14px] md:rounded-[22px]
            "
          >
            <CardButton title="온라인 게임하기" icon="group" onClick={handleOnline} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HomeMenu);
