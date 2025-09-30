'use client';

import Image from 'next/image';
import { memo } from 'react';

type Props = {
  title: string;
  icon: 'robot' | 'group';
  onClick: () => void;
};

const CardButton = ({ title, icon, onClick }: Props) => (
  <>
    <button type="button" className="card" onClick={onClick} aria-label={title}>
      <div className="iconBox">
        <Image src={`/assets/icons/${icon}.svg`} alt={`${title} 아이콘`} width={44} height={44} />
      </div>
      <span className="title">{title}</span>
    </button>

    <style jsx>{`
      .card {
        width: 100%;
        padding: 28px 20px;
        border-radius: 24px;
        background: #f6f7fb;
        display: grid;
        place-items: center;
        gap: 10px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      }
      .card:active {
        transform: scale(0.995);
      }
      .iconBox {
        width: 56px;
        height: 56px;
        display: grid;
        place-items: center;
        border-radius: 14px;
      }
      .title {
        font-weight: 800;
        font-size: 18px;
        color: #2f3a5f;
      }
      @media (min-width: 480px) {
        .card {
          padding: 32px 24px;
        }
        .iconBox {
          width: 64px;
          height: 64px;
          border-radius: 16px;
        }
        .title {
          font-size: 20px;
        }
      }
      @media (min-width: 768px) {
        .card {
          padding: 36px 28px;
          border-radius: 28px;
        }
        .title {
          font-size: 22px;
        }
      }
    `}</style>
  </>
);

export default memo(CardButton);
