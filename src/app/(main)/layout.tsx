'use client';

import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-[430px] min-h-screen mx-auto bg-white overflow-hidden">
      {/* 🎯 반응형 배경 이미지 */}
      <div
        className="
          absolute z-0 w-[1099px] h-[1099px]
          top-11 sm:top-100 md:top-28 lg:top-60
          -left-24
          pointer-events-none 
        "
        aria-hidden
      >
        <img src="/assets/icons/main.svg" alt="배경" className="w-full h-full" />
      </div>

      {/* 🎯 콘텐츠 */}
      <div className="relative z-10 w-full px-6 pt-12 pb-24 min-h-screen">{children}</div>
    </div>
  );
}
