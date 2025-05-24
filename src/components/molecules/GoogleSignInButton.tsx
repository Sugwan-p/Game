'use client';

import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, provider } from '@/lib/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // 이미 가입된 유저면 바로 홈 이동
        router.push('/home');
      } else {
        //  신규 유저라면 로그인 성공 후 프로필 등록으로 이동
        router.push('/login');
      }
    } catch {
      alert('로그인에 실패했습니다.');
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
