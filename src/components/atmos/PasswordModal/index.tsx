'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePasswordModalStore } from '@/stores/passwordModal.store';

const PasswordModal = () => {
  const router = useRouter();
  const {
    isOpen,
    roomId,
    error,
    onJoinAfterValidate,
    verifyPassword, // 서버 검증 콜백(필수로 넘길 예정)
    close,
    setError,
    reset,
  } = usePasswordModalStore();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    if (loading) return;
    close();
    setInput('');
    setError('');
  }, [close, loading, setError]);

  const handleConfirm = useCallback(async () => {
    if (!isOpen || loading) return;
    if (!input.trim()) {
      setError('비밀번호를 입력하세요.');
      return;
    }
    if (!verifyPassword) {
      setError('비밀번호 검증 함수를 찾을 수 없습니다.');
      return;
    }

    setLoading(true);
    try {
      const ok = await verifyPassword(roomId, input);
      if (!ok) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
      // ✅ 통과 시에만 입장
      onJoinAfterValidate?.(roomId);
      reset();
      router.push(`/rooms/${roomId}`);
    } finally {
      setLoading(false);
    }
  }, [
    isOpen,
    loading,
    input,
    verifyPassword,
    onJoinAfterValidate,
    roomId,
    router,
    reset,
    setError,
  ]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" role="dialog" aria-modal aria-label="비밀번호 입력">
        <div className="modal">
          <div className="header">비밀번호가 필요한 방</div>
          <div className="body">
            <label className="label">
              방 입장 비밀번호
              <input
                ref={inputRef}
                type="password"
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                aria-label="방 비밀번호"
                disabled={loading}
              />
            </label>
            {error ? (
              <p className="error" role="alert">
                {error}
              </p>
            ) : null}
          </div>
          <div className="actions">
            <button type="button" className="btn cancel" onClick={handleClose} disabled={loading}>
              취소
            </button>
            <button
              type="button"
              className="btn confirm"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? '확인 중…' : '입장'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.5);
          z-index: 50;
        }
        .modal {
          width: 92%;
          max-width: 420px;
          border-radius: 16px;
          background: #ffffff;
          color: #202020;
          border: 1px solid #e7e5e4;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
          padding: 16px;
        }
        .header {
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .body {
          display: grid;
          gap: 10px;
        }
        .label {
          font-size: 14px;
          display: grid;
          gap: 6px;
        }
        .input {
          height: 36px;
          padding: 0 12px;
          border: 1px solid #a6a09b;
          border-radius: 10px;
          background: #fff;
          color: #202020;
        }
        .error {
          margin-top: 4px;
          font-size: 12px;
          color: #f31260;
        }
        .actions {
          margin-top: 14px;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .btn {
          height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 13px;
        }
        .btn.cancel {
          background: #d4d4d8;
          color: #000;
        }
        .btn.confirm {
          background: #f25267;
          color: #ffffff;
        }
        .btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
};

export default memo(PasswordModal);
