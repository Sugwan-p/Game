'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProfileSetup() {
  const [profileUrl] = useState<string | null>(null);

  const displayedImage = profileUrl ?? '/assets/images/default_profile.png'; // 기본값 지정

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-24">
      <h1 className="text-center text-xl font-semibold text-gray-900 leading-tight">
        프로필 사진으로 사용할 <br />
        사진을 찍어주세요
      </h1>

      {/* 프로필 이미지 영역 */}
      <div className="mt-10 mb-16">
        <Image
          src={displayedImage}
          alt="프로필 사진"
          width={240}
          height={240}
          className="rounded-full object-cover"
          priority
        />
      </div>

      {/* SVG 버튼 + 텍스트 */}
      <div className="flex flex-col items-center space-y-2">
        <Image src="/assets/images/loading.svg" alt="main" width={60} height={60} />
        <span className="text-indigo-600 font-medium text-sm">또는 사진 앨범에서 선택하기</span>
      </div>
    </div>
  );
}
