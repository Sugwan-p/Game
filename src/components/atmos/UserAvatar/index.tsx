'use client';

import Image from 'next/image';
import { memo } from 'react';
import type { Member } from '@/types/member';

type Props = { m: Member; isHost: boolean };

const UserAvatar = ({ m, isHost }: Props) => (
  <>
    <figure className="card" aria-label="참가자">
      <div className="photo">
        {m.photoURL ? (
          <Image src={m.photoURL} alt={`${m.displayName} 아바타`} fill sizes="64px" />
        ) : (
          <div className="placeholder" aria-hidden />
        )}
      </div>
      <figcaption className="meta">
        <span className="name">{m.displayName}</span>
        {isHost ? (
          <span className="badge">방장</span>
        ) : m.isReady ? (
          <span className="ready">준비</span>
        ) : null}
      </figcaption>
    </figure>

    <style jsx>{`
      .card {
        display: grid;
        gap: 8px;
        justify-items: center;
      }
      .photo {
        position: relative;
        width: 64px;
        height: 64px;
        border-radius: 999px;
        overflow: hidden;
        border: 2px solid #e7e5e4;
      }
      .placeholder {
        width: 100%;
        height: 100%;
        background: #d4d4d8;
      } /* default */
      .meta {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .name {
        font-weight: 700;
        color: #202020;
      }
      .badge {
        padding: 2px 6px;
        border-radius: 999px;
        background: #7828c8;
        color: #fff;
        font-size: 11px;
      } /* secondary */
      .ready {
        padding: 2px 6px;
        border-radius: 999px;
        background: #17c964;
        color: #000;
        font-size: 11px;
      } /* success */
    `}</style>
  </>
);

export default memo(UserAvatar);
