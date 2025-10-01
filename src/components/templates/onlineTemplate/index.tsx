'use client';

import { memo, useCallback, useMemo } from 'react';
import MainTemplate from '@/components/templates/MainTemplate';
import HomeHeader from '@/components/molecules/HomeHeader';
import RoomList from '@/components/organisms/RoomList';
import type { Room } from '../../../../types/room';
import Image from 'next/image';

const FAB_HEIGHT = 60; // 매직넘버 상수화

const OnlineTemplate = () => {
  // 데모용 방 목록 (추후 API 연동 교체)
  const rooms = useMemo<Room[]>(
    () => [
      { id: '1', title: '들어와', isPrivate: false },
      { id: '2', title: '게임한번', isPrivate: false },
      { id: '3', title: 'UNO 게임', isPrivate: true },
      { id: '4', title: 'PLAY', isPrivate: true },
      { id: '5', title: 'GAME', isPrivate: false },
    ],
    [],
  );

  const handleJoin = useCallback((roomId: string) => {
    // TODO: 입장 로직 연결
    console.log('join:', roomId);
  }, []);

  const handleCreate = useCallback(() => {
    // TODO: 방 만들기 로직 연결(모달 or 페이지 이동)
    console.log('create room');
  }, []);

  return (
    <>
      <MainTemplate>
        <HomeHeader />
        <RoomList rooms={rooms} onJoin={handleJoin} />

        {/* 하단 고정 "방 만들기" 버튼 */}
        <div className="fabWrap">
          <button type="button" className="fab" onClick={handleCreate} aria-label="방 만들기">
            <span className="plus">
              <Image src="/assets/icons/plus.svg" alt="추가" width={17} height={17} />
            </span>
            <span className="label">방 만들기</span>
          </button>
        </div>
      </MainTemplate>

      <style jsx>{`
        .fabWrap {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 16px;
          display: grid;
          place-items: center;
          pointer-events: none; /* 오직 버튼만 클릭 가능 */
        }
        .fab {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          height: ${FAB_HEIGHT}px;
          padding: 0 20px;
          border-radius: 999px;
          background: #9aa4ae;
          color: #fff;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
          border: 1px solid #e7e5e4;
          font-weight: 800;
          letter-spacing: 0.2px;
        }
        .fab:active {
          transform: scale(0.98);
        }
        .plus {
          display: inline-grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: #f0f3f8;
          border: 1px solid #e7e5e4;
        }
      `}</style>
    </>
  );
};

export default memo(OnlineTemplate);
