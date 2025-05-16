'use client';

import Logo from '@/components/atmos/logo';
import Title from '@/components/atmos/title';
import GoogleSignInButton from '@/components/molecules/GoogleSignInButton';
import Image from 'next/image';

const SignInScreen = () => {
  return (
    <div className="relative w-full max-w-[420px] min-h-screen mx-auto bg-white px-6 py-12 overflow-hidden">
      {/* 배경 패턴 */}
      <Image
        src="/assets/images/bg-pattern.svg" // 곡선 배경 이미지
        alt="background pattern"
        fill
        className="pointer-events-none object-cover opacity-10"
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col gap-8">
        {/* 로고 */}
        <div className="w-[85px] h-[85px]">
          <Logo />
        </div>

        {/* 타이틀 */}
        <div className="w-full">
          <Title />
        </div>

        {/* 설명 */}
        <div className="space-y-4 text-[15px] text-gray-700 leading-relaxed font-[Pretendard]">
          <p>
            간편하게 방을 만들고,
            <br />
            <span className="text-[#6366F1] font-medium">친구들과 함께</span> 접속해보세요.
          </p>
          <p>
            실제 UNO의 재미를
            <br />
            <span className="text-purple-500 font-medium">온라인</span>에서도 그대로 느낄 수 있어요!
          </p>
        </div>

        {/* 버튼 */}
        <div className="mt-[123px] flex justify-center">
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
