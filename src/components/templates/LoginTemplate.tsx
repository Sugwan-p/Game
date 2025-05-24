'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getBlob } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase';

export default function ProfileSetup() {
  const [profileUrl, setProfileUrl] = useState<string | null>(null); // 미리보기 URL
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null); // Firebase에서 가져온 Blob URL
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const displayedImage = profileUrl ?? '/assets/images/default_profile.png';

  // 파일 탐색기 열기
  const handleOpenGallery = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 및 업로드 처리
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 브라우저 미리보기용 URL
    const previewUrl = URL.createObjectURL(file);
    setProfileUrl(previewUrl);

    const user = auth.currentUser;
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const imageRef = ref(storage, `profile_images/${user.uid}`);

      // Firebase Storage에 파일 업로드
      await uploadBytes(imageRef, file);

      // 업로드된 이미지 Blob 가져와서 로컬 URL로 변환 (CORS-safe 방식)
      const blob = await getBlob(imageRef);
      const safeUrl = URL.createObjectURL(blob);
      setUploadedUrl(safeUrl);

      router.push(`/nickname?photo=${encodeURIComponent(safeUrl)}`);
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-24 bg-white">
      <h1 className="text-center text-xl font-semibold text-gray-900 leading-tight">
        프로필 사진으로 사용할 <br />
        사진을 찍어주세요
      </h1>

      {/* 업로드된 이미지가 있다면 보여줌 */}
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
    </div>
  );
}
