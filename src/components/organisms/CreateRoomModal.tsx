'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type CreateRoomForm = {
  title: string;
  password: string;
  maxPlayers: number;
  visibility: 'public' | 'private';
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (form: CreateRoomForm) => Promise<void> | void;
};

const INITIAL: CreateRoomForm = { title: '', password: '', maxPlayers: 4, visibility: 'public' };

const CreateRoomModal = ({ open, onClose, onCreate }: Props) => {
  const [form, setForm] = useState<CreateRoomForm>(INITIAL);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKey);
    } else {
      window.removeEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, handleKey]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  const setTitle = useCallback((v: string) => setForm((s) => ({ ...s, title: v })), []);
  const setPassword = useCallback((v: string) => setForm((s) => ({ ...s, password: v })), []);
  const setMaxPlayers = useCallback((v: number) => setForm((s) => ({ ...s, maxPlayers: v })), []);
  const setVisibility = useCallback(
    (v: 'public' | 'private') => setForm((s) => ({ ...s, visibility: v })),
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (!form.title.trim()) {
      alert('방 제목을 입력해 주세요.');
      return;
    }
    if (form.visibility === 'private' && !form.password.trim()) {
      alert('비공개 방의 비밀번호를 입력해 주세요.');
      return;
    }
    await onCreate(form);
    setForm(INITIAL);
    onClose();
  }, [form, onCreate, onClose]);

  const handleClose = useCallback(() => {
    setForm(INITIAL);
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 grid place-items-center bg-black/45 p-4 z-[1000]"
      onMouseDown={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="
          w-full max-w-[520px] bg-white rounded-3xl border border-[#E7E5E4]
          shadow-[0_22px_60px_rgba(0,0,0,0.22)]
        "
        role="document"
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-[18px] border-b border-[#E7E5E4]">
          <strong className="text-2xl font-black text-black">방 만들기</strong>
          <button
            type="button"
            className="w-11 h-11 grid place-items-center rounded-full bg-[#F6F7FB] border-2 border-[#B4BBC4] active:scale-95 transition-transform"
            aria-label="닫기"
            onClick={handleClose}
          >
            <Image src="/assets/icons/close.svg" alt="닫기" width={18} height={18} />
          </button>
        </div>

        {/* body */}
        <div className="px-5 py-[18px] grid gap-4">
          {/* 방제목 */}
          <label className="grid grid-cols-[84px_1fr] items-center gap-2.5 max-[420px]:grid-cols-1 max-[420px]:gap-1.5">
            <span className="text-[15px] text-[#8A95A1]">방제목</span>
            <input
              className="w-full h-12 border border-[#eee] rounded-[14px] px-3.5 py-2.5 bg-white text-black placeholder:text-black placeholder:opacity-35"
              type="text"
              placeholder="예: 즐겜방"
              value={form.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          {/* 공개여부 */}
          <label className="grid grid-cols-[84px_1fr] items-center gap-2.5 max-[420px]:grid-cols-1 max-[420px]:gap-1.5">
            <span className="text-[15px] text-[#8A95A1]">공개여부</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`h-12 rounded-[14px] border font-extrabold ${
                  form.visibility === 'public'
                    ? 'text-black border-[#8A95A1] shadow-[inset_0_2px_0_rgba(0,0,0,0.04)]'
                    : 'text-black border-[#d9d9d9] bg-white'
                }`}
                onClick={() => setVisibility('public')}
                aria-pressed={form.visibility === 'public'}
              >
                공개
              </button>
              <button
                type="button"
                className={`h-12 rounded-[14px] border font-extrabold ${
                  form.visibility === 'private'
                    ? 'text-black border-[#8A95A1] shadow-[inset_0_2px_0_rgba(0,0,0,0.04)]'
                    : 'text-black border-[#d9d9d9] bg-white'
                }`}
                onClick={() => setVisibility('private')}
                aria-pressed={form.visibility === 'private'}
              >
                비공개
              </button>
            </div>
          </label>

          {/* 비밀번호 */}
          {form.visibility === 'private' ? (
            <label className="grid grid-cols-[84px_1fr] items-center gap-2.5 max-[420px]:grid-cols-1 max-[420px]:gap-1.5">
              <span className="text-[15px] text-[#8A95A1]">비밀번호</span>
              <input
                className="w-full h-12 border border-[#eee] rounded-[14px] px-3.5 py-2.5 bg-white text-black placeholder:text-black placeholder:opacity-35"
                type="password"
                placeholder="비공개 방 비밀번호"
                value={form.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          ) : null}

          {/* 인원 수 */}
          <label className="grid grid-cols-[84px_1fr] items-center gap-2.5 max-[420px]:grid-cols-1 max-[420px]:gap-1.5">
            <span className="text-[15px] text-[#8A95A1]">인원 수</span>
            <input
              className="w-full h-12 border border-[#eee] rounded-[14px] px-3.5 py-2.5 bg-white text-black"
              type="number"
              min={2}
              max={10}
              step={1}
              value={form.maxPlayers}
              onChange={(e) =>
                setMaxPlayers(Math.max(2, Math.min(10, Number(e.target.value) || 2)))
              }
            />
          </label>
        </div>

        {/* footer */}
        <div className="px-5 py-[18px] grid grid-cols-2 gap-3 border-t border-[#E7E5E4]">
          <button
            type="button"
            className="h-14 rounded-full font-extrabold bg-white text-black border-2 border-[#7B8A99] active:scale-95 transition-transform"
            onClick={handleClose}
          >
            게임으로 돌아가기
          </button>
          <button
            type="button"
            className="h-14 rounded-full font-extrabold bg-[#8B99A6] text-white border border-[#7E8E9D] active:scale-95 transition-transform"
            onClick={handleSubmit}
          >
            입력
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CreateRoomModal);
