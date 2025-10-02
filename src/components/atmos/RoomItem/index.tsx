'use client';

import Image from 'next/image';
import { memo } from 'react';

type Props = {
  title: string;
  isPrivate: boolean;
  onJoin: () => void;
};

const RoomItem = ({ title, isPrivate, onJoin }: Props) => (
  <>
    <div className="row">
      <div className="left">
        <span className="title">{title}</span>
      </div>
      <div className="right">
        {isPrivate ? (
          <Image src="/assets/icons/lock.svg" alt="잠금" width={16} height={16} className="lock" />
        ) : null}
        <button type="button" className="badge" onClick={onJoin} aria-label={`${title} 참여`}>
          참여
        </button>
      </div>
    </div>
    <div className="sep" />

    <style jsx>{`
      .row {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        padding: 14px 6px;
      }
      .left {
        display: flex;
        align-items: center;
      }
      .right {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .title {
        font-weight: 800;
        font-size: 16px;
        color: #202020;
      }
      .sep {
        height: 1px;
        background: #e7e5e4;
      }
      .badge {
        min-width: 56px;
        height: 28px;
        padding: 0 12px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 13px;
        display: inline-grid;
        place-items: center;
        background: #9aa4ae;
        color: #fff;
      }
      .badge:active {
        transform: scale(0.98);
      }
      .lock {
        opacity: 0.8;
      }
    `}</style>
  </>
);

export default memo(RoomItem);
