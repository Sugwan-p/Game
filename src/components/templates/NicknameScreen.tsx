'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/atmos/button';
import { IconBack } from '@/components/atmos/IconBack';
import { auth } from '@/lib/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default function NicknameScreen() {
  const [nickname, setNickname] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const photo = searchParams.get('photo');
    setPhotoUrl(photo ?? '/assets/images/default_profile.png');
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 5) {
      setNickname(e.target.value);
    }
  };

  const handleNext = async () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('로그인 유저가 없습니다.');
      return;
    }

    try {
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        nickname,
        photoURL: photoUrl,
        email: user.email,
      });

      router.push('/home');
    } catch {
      alert('닉네임 저장에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col px-2 pt-3 max-w-[420px] mx-auto bg-white">
      {/* 상단 헤더 */}
      <button className="mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#90A4AE] shadow-sm">
          <IconBack className="w-5 h-5 text-white" />
        </div>
      </button>

      {/* 타이틀 */}
      <h1 className="text-black text-center text-xl font-bold">플레이어 이름을 정해주세요</h1>
      <p className="text-center text-sm text-gray-400 mt-1">최대 5글자까지만 사용할 수 있어요</p>

      {/* 닉네임 입력 */}
      <div className="flex items-center bg-[#f1f3f7] rounded-full px-4 py-3 mt-8">
        <Image
          src={photoUrl || '/assets/images/default_profile.png'}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <input
          type="text"
          value={nickname}
          onChange={handleChange}
          placeholder="닉네임 입력"
          autoFocus
          className="bg-transparent flex-1 ml-3 outline-none text-lg placeholder-gray-400 text-black"
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-center mt-12">
        <Button text="다음" onClick={handleNext} />
      </div>
    </div>
  );
}
