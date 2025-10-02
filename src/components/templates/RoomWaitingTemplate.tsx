'use client';

import { memo } from 'react';
import Image from 'next/image';
import type { Room } from '@/types/room';
import type { Member } from '@/types/member';
import ParticipantsList from '@/components/molecules/ParticipantsList';
import StartGameButton from '@/components/atmos/StartGameButton';
import HomeHeader from '../molecules/HomeHeader';

type Props = {
  room?: Room;
  members: Member[];
  me?: Member;
  capacity: number;
  isHost: boolean;
  canStart: boolean;
  onToggleReady: () => void;
  onStart: () => void;
};

const RoomWaitingTemplate = ({
  room,
  members,
  me,
  capacity,
  isHost,
  canStart,
  onToggleReady,
  onStart,
}: Props) => (
  <section className="min-h-screen bg-white">
    {room ? <HomeHeader /> : null}

    <div className="mx-auto w-full max-w-[760px] px-4 pb-10">
      <div className="rounded-3xl border border-[#E7E5E4] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.06)]">
        {/* HERO */}
        <div className="mx-4 mt-4 rounded-2xl border border-[#E7E5E4] bg-white px-5 pt-6 pb-8">
          <h2 className="text-center text-[18px] font-extrabold text-[#202020]">
            {room?.title ?? '안녕'}
          </h2>

          {/* 제목 아래 SVG 간격: 살짝 촘촘하게 */}
          <div className="mx-auto mt-3 flex w-full items-center justify-center">
            <Image
              src="/assets/icons/room-hero.svg"
              alt=""
              width={360}
              height={200}
              priority
              className="block h-auto w-full max-w-[360px] object-contain"
            />
          </div>

          {/* 준비하기 버튼: 절대위치 X, 자연스럽게 위쪽 배치 */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={onToggleReady}
              aria-label="준비 토글"
              className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-full bg-[#9AA4AE] px-6 text-[16px] font-extrabold text-white active:scale-[0.98]"
            >
              {me?.isReady ? '준비 해제' : '준비하기'}
            </button>
          </div>
        </div>

        <div className="mx-4 my-4 h-px bg-[#E7E5E4]" />

        {/* 참가자 (원형이 밖으로 나가지 않게) */}
        <div className="mx-4 mb-4 rounded-2xl border border-[#E7E5E4] bg-white px-4 py-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[16px] font-extrabold text-[#202020]">참가자</span>
            <span className="text-[12px] font-medium text-[#57534D]">
              {members.length}/{capacity}
            </span>
          </div>

          {/* 오른쪽 짤림 방지: overflow-hidden + 살짝 축소 + 우측 여유 */}
          <div className="overflow-hidden pr-1">
            <div className="origin-left w-full max-w-full scale-[0.84] xs:scale-[0.88] sm:scale-[0.92] md:scale-100">
              <ParticipantsList
                members={members}
                hostUid={room?.hostUid ?? ''}
                capacity={capacity}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-4 mb-6 mt-2 flex flex-col items-center gap-3">
          <StartGameButton canStart={canStart} onStart={onStart} />
          <p className="text-center text-[12px] text-[#57534D]">
            {isHost
              ? `방장 전용: 인원이 ${capacity}명이고 모두 준비 상태일 때 시작할 수 있어요.`
              : '방장이 시작을 누르면 게임이 시작됩니다.'}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default memo(RoomWaitingTemplate);
