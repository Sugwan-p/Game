'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import MainTemplate from '@/components/templates/MainTemplate';
import HomeHeader from '@/components/molecules/HomeHeader';
import RoomList from '@/components/organisms/RoomList';
import CreateRoomModal from '@/components/organisms/CreateRoomModal';
import type { Room } from '../../../../types/room';
import { db } from '@/lib/firebase';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

const FAB_HEIGHT = 60;

const MOCK_ROOMS: Room[] = [
  { id: '1', title: '들어와', isPrivate: false },
  { id: '2', title: '게임한번', isPrivate: false },
  { id: '3', title: 'UNO 게임', isPrivate: true },
  { id: '4', title: 'PLAY', isPrivate: true },
  { id: '5', title: 'GAME', isPrivate: false },
];

type OnlineState = {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
};

const INITIAL: OnlineState = { rooms: [], loading: true, error: null, modalOpen: false };

type RoomDoc = {
  title: string;
  isPrivate: boolean;
  maxPlayers?: number;
  password?: string | null; // 데모용(운영에서는 해시/규칙 필요)
  createdAt?: Timestamp | number | null;
};

const OnlineTemplate = () => {
  const [state, setState] = useState<OnlineState>(INITIAL);

  const openModal = useCallback(() => setState((s) => ({ ...s, modalOpen: true })), []);
  const closeModal = useCallback(() => setState((s) => ({ ...s, modalOpen: false })), []);

  // Firestore 구독
  useEffect(() => {
    const roomsRef = collection(db, 'rooms');
    const q = query(roomsRef, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: Room[] = snap.docs.map((d) => {
          const data = d.data() as RoomDoc;

          let createdAt: number | undefined;
          if (typeof data.createdAt === 'number') createdAt = data.createdAt;
          else if (data.createdAt instanceof Timestamp) createdAt = data.createdAt.toMillis();

          return {
            id: d.id,
            title: data.title ?? '',
            isPrivate: Boolean(data.isPrivate),
            maxPlayers: data.maxPlayers,
            createdAt,
          };
        });

        setState((s) => ({ ...s, rooms: list, loading: false, error: null }));
      },
      (err) => setState((s) => ({ ...s, loading: false, error: err.message })),
    );

    return () => unsub();
  }, []);

  const displayRooms = useMemo<Room[]>(
    () => (state.rooms.length ? state.rooms : MOCK_ROOMS),
    [state.rooms],
  );

  const handleJoin = useCallback((roomId: string) => {
    // TODO: 입장 라우팅/검증
    console.log('join:', roomId);
  }, []);

  const handleCreate = useCallback(
    async (form: {
      title: string;
      password: string;
      maxPlayers: number;
      visibility: 'public' | 'private';
    }) => {
      try {
        const roomsRef = collection(db, 'rooms');
        await addDoc(roomsRef, {
          title: form.title.trim(),
          isPrivate: form.visibility === 'private',
          maxPlayers: form.maxPlayers,
          password: form.visibility === 'private' ? form.password : null, // 데모용 저장
          createdAt: serverTimestamp(),
        });
        // onSnapshot으로 자동 반영
      } catch (e) {
        console.error(e);
        alert('방 생성 중 오류가 발생했습니다.');
      }
    },
    [],
  );

  return (
    <>
      <MainTemplate>
        <HomeHeader />
        <RoomList rooms={displayRooms} onJoin={handleJoin} />

        {/* 하단 고정 "방 만들기" 버튼 */}
        <div className="fabWrap">
          <button type="button" className="fab" onClick={openModal} aria-label="방 만들기">
            <span className="plus">
              <img src="/assets/icons/plus.svg" alt="추가" width={17} height={17} />
            </span>
            <span className="label">{state.loading ? '불러오는 중…' : '방 만들기'}</span>
          </button>
        </div>
      </MainTemplate>

      {/* 모달 */}
      <CreateRoomModal open={state.modalOpen} onClose={closeModal} onCreate={handleCreate} />

      <style jsx>{`
        .fabWrap {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 16px;
          display: grid;
          place-items: center;
          pointer-events: none;
          z-index: 10;
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
