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
    <>
      <div
        ref={dialogRef}
        className="overlay"
        onMouseDown={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal" role="document">
          <div className="head">
            <strong className="title">방 만들기</strong>
            <button type="button" className="iconBtn" aria-label="닫기" onClick={handleClose}>
              <Image src="/assets/icons/close.svg" alt="닫기" width={18} height={18} />
            </button>
          </div>

          <div className="body">
            {/* 방제목 */}
            <label className="field">
              <span className="label">방제목</span>
              <input
                className="input"
                type="text"
                placeholder="예: 즐겜방"
                value={form.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            {/* 공개여부 토글 */}
            <label className="field">
              <span className="label">공개여부</span>
              <div className="seg">
                <button
                  type="button"
                  className={form.visibility === 'public' ? 'segBtn active' : 'segBtn'}
                  onClick={() => setVisibility('public')}
                  aria-pressed={form.visibility === 'public'}
                >
                  공개
                </button>
                <button
                  type="button"
                  className={form.visibility === 'private' ? 'segBtn active' : 'segBtn'}
                  onClick={() => setVisibility('private')}
                  aria-pressed={form.visibility === 'private'}
                >
                  비공개
                </button>
              </div>
            </label>

            {/* 비공개일 때만 비밀번호 노출 */}
            {form.visibility === 'private' ? (
              <label className="field">
                <span className="label">비밀번호</span>
                <input
                  className="input"
                  type="password"
                  placeholder="비공개 방 비밀번호"
                  value={form.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            ) : null}

            {/* 인원 수 */}
            <label className="field">
              <span className="label">인원 수</span>
              <input
                className="input"
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

          <div className="foot">
            <button type="button" className="btn ghost" onClick={handleClose}>
              게임으로 돌아가기
            </button>
            <button type="button" className="btn primary" onClick={handleSubmit}>
              입력
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: grid;
          place-items: center;
          padding: 16px;
          z-index: 1000;
        }
        .modal {
          width: 100%;
          max-width: 520px;
          background: #fff;
          border-radius: 24px;
          border: 1px solid #e7e5e4;
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.22);
        }

        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid #e7e5e4;
        }
        .title {
          font-size: 24px;
          font-weight: 900;
          color: #000;
        } /* 제목 검은색 */

        .iconBtn {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: #f6f7fb;
          border: 2px solid #b4bbc4;
        }
        .iconBtn:active {
          transform: scale(0.98);
        }

        .body {
          padding: 18px 20px;
          display: grid;
          gap: 16px;
        }
        .field {
          display: grid;
          grid-template-columns: 84px 1fr;
          align-items: center;
          gap: 10px;
        }
        .label {
          font-size: 15px;
          color: #8a95a1;
        }

        .input {
          width: 100%;
          height: 48px;
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 10px 14px;
          background: #fff;
          color: #000; /* 입력 텍스트 검은색 */
        }
        .input::placeholder {
          color: #000;
          opacity: 0.35;
        } /* 플레이스홀더도 검은색 톤 */

        .seg {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .segBtn {
          height: 48px;
          border-radius: 14px;
          border: 1px solid #d9d9d9;
          background: #fff;
          font-weight: 800;
          color: #000; /* 기본도 검은색 */
        }
        .segBtn.active {
          color: #000;
          border-color: #8a95a1;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.04) inset;
        }

        .foot {
          padding: 18px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          border-top: 1px solid #e7e5e4;
        }
        .btn {
          height: 56px;
          border-radius: 999px;
          font-weight: 800;
        }
        .ghost {
          background: #fff;
          color: #000;
          border: 2px solid #7b8a99;
        } /* 텍스트 검은색 */
        .primary {
          background: #8b99a6;
          color: #fff;
          border: 1px solid #7e8e9d;
        }
        .btn:active {
          transform: scale(0.985);
        }

        @media (max-width: 420px) {
          .field {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }
      `}</style>
    </>
  );
};

export default memo(CreateRoomModal);
