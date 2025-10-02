'use client';

import { memo } from 'react';
import type { Member } from '@/types/member';
import UserAvatar from '@/components/atmos/UserAvatar';

type Props = { members: Member[]; hostUid: string; capacity: number };

const ParticipantsList = ({ members, hostUid, capacity }: Props) => (
  <>
    <div className="wrap">
      {members.map((m) => (
        <UserAvatar key={m.uid} m={m} isHost={m.uid === hostUid} />
      ))}
      {/* 빈 슬롯 */}
      {Array.from({ length: Math.max(0, capacity - members.length) }).map((_, i) => (
        <div key={`empty-${i}`} className="empty" aria-hidden />
      ))}
    </div>

    <style jsx>{`
      .wrap {
        display: grid;
        grid-template-columns: repeat(4, minmax(72px, 1fr));
        gap: 16px;
      }
      .empty {
        width: 64px;
        height: 64px;
        border-radius: 999px;
        background: #f9f9f8;
        border: 2px dashed #e7e5e4;
        justify-self: center;
      }
      @media (min-width: 480px) {
        .wrap {
          grid-template-columns: repeat(6, minmax(72px, 1fr));
        }
      }
    `}</style>
  </>
);

export default memo(ParticipantsList);
