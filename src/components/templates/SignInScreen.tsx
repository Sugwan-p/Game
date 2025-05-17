'use client';

import Logo from '@/components/atmos/logo';
import Title from '@/components/atmos/title';
import GoogleSignInButton from '@/components/molecules/GoogleSignInButton';

const SignInScreen = () => {
  return (
    <div className="flex flex-col gap-8 px-6 py-12">
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
      <div className="py-12 flex justify-center">
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default SignInScreen;
