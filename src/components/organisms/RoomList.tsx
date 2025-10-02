'use client';

import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Room } from '../../../types/room';
import RoomItem from '@/components/atmos/RoomItem';
import PasswordModal from '@/components/atmos/PasswordModal';
import { usePasswordModalStore } from '@/stores/passwordModal.store';
import { verifyRoomPassword } from '@/api/rooms';

type Props = {
  rooms: Room[];
  onJoin: (roomId: string) => void;
};

const RoomList = ({ rooms, onJoin }: Props) => {
  const router = useRouter();
  const { open: openPasswordModal } = usePasswordModalStore();

  const roomMap = useMemo<Record<string, Room>>(
    () => Object.fromEntries(rooms.map((r) => [String(r.id), r])),
    [rooms],
  );

  // 렌더 내 함수 정의 금지 → id별 handler 테이블
  const joinHandlers = useMemo<Record<string, () => void>>(
    () =>
      Object.fromEntries(
        rooms.map(({ id }) => {
          const key = String(id);
          const handler = () => {
            const room = roomMap[key];
            if (!room) return;

            if (room.isPrivate) {
              // 🔐 비공개: 모달 열고, 모달에서만 서버검증 → 성공 시에만 입장
              openPasswordModal({
                roomId: key,
                onJoinAfterValidate: (rid) => {
                  onJoin(rid);
                  router.push(`/rooms/${rid}`);
                },
                verifyPassword: verifyRoomPassword, // ✅ 서버 검증 콜백 필수 전달
              });
              return;
            }

            // 🔓 공개 방: 바로 조인 + 이동
            onJoin(key);
            router.push(`/rooms/${key}`);
          };
          return [key, handler];
        }),
      ),
    [rooms, roomMap, onJoin, openPasswordModal, router],
  );

  return (
    <>
      <section className="wrap" aria-label="게임 대기방">
        <div className="panel">
          <div className="titleWrap">
            <div className="title">게임 대기방</div>
          </div>

          <div className="sub">방제목</div>

          <div className="list">
            {rooms.map(({ id, title, isPrivate }) => {
              const key = String(id);
              return (
                <RoomItem
                  key={key}
                  title={title}
                  isPrivate={isPrivate}
                  onJoin={joinHandlers[key]}
                />
              );
            })}
          </div>

          <div className="footerPad" />
        </div>
      </section>

      {/* 전역 모달 */}
      <PasswordModal />

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
        }
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
};

export default memo(RoomList);
