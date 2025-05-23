'use client';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const GoogleSignInButton = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('유저 정보:', {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      });

      router.push('/login');
    } catch (error) {
      console.error(' 로그인 실패:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="w-[203px] h-[47px] bg-[#f2f2f2] rounded-full flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition text-[15px] font-medium text-gray-800 font-[Pretendard]"
    >
      <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
