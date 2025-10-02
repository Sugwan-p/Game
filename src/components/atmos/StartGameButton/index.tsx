'use client';

import { memo } from 'react';

type Props = {
  canStart: boolean;
  onStart: () => void;
};

const StartGameButton = ({ canStart, onStart }: Props) => (
  <>
    <button
      type="button"
      className={`btn ${canStart ? 'on' : 'off'}`}
      onClick={canStart ? onStart : undefined}
      aria-disabled={!canStart}
      aria-label="게임 시작"
    >
      게임 시작
    </button>

    <style jsx>{`
      .btn {
        width: 100%;
        max-width: 420px;
        height: 48px;
        border-radius: 999px;
        font-weight: 800;
        display: grid;
        place-items: center;
        transition: transform 0.08s ease;
      }
      .btn.on {
        background: #f25267;
        color: #fff;
      } /* main */
      .btn.off {
        background: #9aa4ae;
        color: #fff;
      } /* 회색(지정X라서 주석: 임시 사용) */
      .btn:active {
        transform: scale(0.98);
      }
    `}</style>
  </>
);

export default memo(StartGameButton);
