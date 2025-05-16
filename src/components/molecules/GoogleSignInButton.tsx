'use client';

const GoogleSignInButton = () => {
  const handleSignIn = () => {
    console.log('Google 로그인 시도');
  };

  return (
    <button
      onClick={handleSignIn}
      className="w-[203px] h-[47px] bg-[#f2f2f2]  rounded-full flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition text-[15px] font-medium text-gray-800 font-[Pretendard]"
    >
      <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
