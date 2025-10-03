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
              // 🔐 비공개: 모달 열고 서버 검증 후 입장
              openPasswordModal({
                roomId: key,
                onJoinAfterValidate: (rid) => {
                  onJoin(rid);
                  router.push(`/rooms/${rid}`);
                },
                verifyPassword: verifyRoomPassword,
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
      <section className="mt-4 px-4 md:px-5 lg:max-w-[720px] lg:mx-auto" aria-label="게임 대기방">
        <div
          className="
            rounded-[24px] bg-[#F5F7FB] border border-[#E7E5E4] p-[18px]
            shadow-[0_10px_28px_rgba(0,0,0,0.06)]
            min-[480px]:rounded-[28px] min-[480px]:p-[22px]
            md:rounded-[32px] md:p-[26px]
          "
        >
          <div className="grid place-items-center px-3 py-4">
            <div
              className="
                inline-grid place-items-center
                min-h-[44px] px-[18px] py-2
                rounded-full border border-[#9aa4ae]
                text-[#2f3a5f] font-extrabold
              "
            >
              게임 대기방
            </div>
          </div>

          <div className="mt-3 mb-1 text-[14px] text-[#444] opacity-90">방제목</div>

          <div
            className="
              bg-white/60 rounded-[20px] p-2
              min-[480px]:rounded-[22px] min-[480px]:p-[10px]
            "
          >
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

          <div className="h-16" />
        </div>
      </section>

      {/* 전역 모달 */}
      <PasswordModal />
    </>
  );
};

export default memo(RoomList);
