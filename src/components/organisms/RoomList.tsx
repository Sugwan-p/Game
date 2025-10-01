'use client';

import { memo } from 'react';
import type { Room } from '../../../types/room';
import RoomItem from '@/components/atmos/RoomItem';

type Props = {
  rooms: Room[];
  onJoin: (roomId: string) => void;
};

const RoomList = ({ rooms, onJoin }: Props) => (
  <>
    <section className="wrap" aria-label="게임 대기방">
      <div className="panel">
        <div className="titleWrap">
          <div className="title">게임 대기방</div>
        </div>

        <div className="sub">방제목</div>

        <div className="list">
          {rooms.map(({ id, title, isPrivate }) => (
            <RoomItem key={id} title={title} isPrivate={isPrivate} onJoin={() => onJoin(id)} />
          ))}
        </div>

        <div className="footerPad" />
      </div>
    </section>

    <style jsx>{`
      .wrap {
        padding: 16px;
      }
      .panel {
        border-radius: 24px;
        background: #f5f7fb;
        border: 1px solid #e7e5e4;
        padding: 18px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
      }
      .titleWrap {
        display: grid;
        place-items: center;
        padding: 16px 12px;
      }
      .title {
        display: inline-grid;
        place-items: center;
        min-height: 44px;
        padding: 8px 18px;
        border-radius: 999px;
        border: 1px solid #9aa4ae;
        color: #2f3a5f;
        font-weight: 800;
      }
      .sub {
        margin-top: 12px;
        margin-bottom: 4px;
        font-size: 14px;
        color: #444;
        opacity: 0.9;
      }
      .list {
        background: rgba(255, 255, 255, 0.6);
        border-radius: 20px;
        padding: 8px;
      }
      .footerPad {
        height: 64px;
      } /* 하단 고정 버튼과 여백 확보 */

      @media (min-width: 480px) {
        .panel {
          border-radius: 28px;
          padding: 22px;
        }
        .list {
          border-radius: 22px;
          padding: 10px;
        }
      }
      @media (min-width: 768px) {
        .wrap {
          padding: 20px;
        }
        .panel {
          border-radius: 32px;
          padding: 26px;
        }
      }
      @media (min-width: 1024px) {
        .wrap {
          max-width: 720px;
          margin: 0 auto;
        }
      }
    `}</style>
  </>
);

export default memo(RoomList);
