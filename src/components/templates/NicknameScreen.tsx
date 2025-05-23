'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/atmos/button';
import { IconBack } from '@/components/atmos/IconBack';

export default function NicknameScreen() {
  const [nickname, setNickname] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 5) {
      setNickname(e.target.value);
    }
  };

  const handleNext = () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    console.log(nickname);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col px-2 pt-3  max-w-[420px] mx-auto bg-white">
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
          src="/assets/images/default_profile.png"
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
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
