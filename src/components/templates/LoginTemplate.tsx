'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getBlob } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase';
import { Button } from '@/components/atmos/button';

export default function ProfileSetup() {
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const DEFAULT_IMAGE = '/assets/images/default_profile.png';
  const displayedImage = profileUrl ?? DEFAULT_IMAGE;

  const handleOpenGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfileUrl(previewUrl);

    const user = auth.currentUser;
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const imageRef = ref(storage, `profile_images/${user.uid}`);
      await uploadBytes(imageRef, file);
      const blob = await getBlob(imageRef);
      const safeUrl = URL.createObjectURL(blob);
      setUploadedUrl(safeUrl);

      router.push(`/nickname?photo=${encodeURIComponent(safeUrl)}`);
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleSkip = () => {
    router.push(`/nickname?photo=${encodeURIComponent(DEFAULT_IMAGE)}`);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-24 bg-white">
      <h1 className="text-center text-xl font-semibold text-gray-900 leading-tight">
        프로필 사진으로 사용할 <br />
        사진을 찍어주세요
      </h1>

      <div className="mt-10 mb-16">
        <Image
          src={uploadedUrl || displayedImage}
          alt="프로필 사진"
          width={240}
          height={240}
          className="rounded-full object-cover"
          priority
        />
      </div>

      <div
        className="flex flex-col items-center space-y-2 cursor-pointer"
        onClick={handleOpenGallery}
      >
        <Image src="/assets/images/loading.svg" alt="main" width={60} height={60} />
        <span className="text-indigo-600 font-medium text-sm">또는 사진 앨범에서 선택하기</span>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 건너뛰기 버튼 */}
      <Button text="건너뛰기" onClick={handleSkip} />
    </div>
  );
}
