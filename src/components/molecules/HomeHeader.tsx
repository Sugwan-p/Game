'use client';

import Image from 'next/image';
import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const HomeHeader = () => {
  const router = useRouter();

  const handleTrophy = useCallback(() => {
    router.push('/rank'); // TODO: 랭킹/업적 페이지 연결
  }, [router]);

  return (
    <header className="relative px-4 pt-4 bg-white" aria-label="Home header">
      <div className="h-[88px] md:h-[96px]">
        {/* 로고 영역 */}
        <div className="flex justify-center items-center">
          <div
            className="
              w-[76px] h-[76px] md:w-[84px] md:h-[84px]
              grid place-items-center
              bg-[#0C0A09] rounded-[16px] md:rounded-[20px]
              shadow-[0_8px_24px_rgba(0,0,0,0.06)]
            "
          >
            <Image src="/assets/images/icon.svg" alt="앱 로고" width={72} height={72} priority />
          </div>
        </div>

        {/* 트로피 버튼 */}
        <button
          type="button"
          aria-label="랭크/업적 보러가기"
          onClick={handleTrophy}
          className="
            absolute right-4 top-3
            grid place-items-center
            w-11 h-11
            bg-white border border-[#E7E5E4] rounded-full
            shadow-[0_4px_14px_rgba(0,0,0,0.06)]
            active:scale-95 transition-transform
          "
        >
          <Image src="/assets/icons/trophy.svg" alt="트로피" width={24} height={24} />
        </button>
      </div>
    </header>
  );
};

export default memo(HomeHeader);
