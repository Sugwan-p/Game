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
        <div className="fixed inset-x-0 bottom-4 grid place-items-center pointer-events-none z-10">
          <button
            type="button"
            onClick={openModal}
            aria-label="방 만들기"
            style={{ height: FAB_HEIGHT }} // ← 높이 보장 (60px)
            className={`
              pointer-events-auto inline-flex items-center gap-3
              px-5 rounded-full
              bg-[#9aa4ae] text-white
              shadow-[0_8px_22px_rgba(0,0,0,0.12)]
              border border-[#E7E5E4]
              font-extrabold tracking-[0.2px]
              active:scale-[0.98] transition-transform
            `}
          >
            <span
              className={`
                inline-grid place-items-center
                w-[26px] h-[26px] rounded-full
                bg-[#F0F3F8] border border-[#E7E5E4]
              `}
            >
              <img src="/assets/icons/plus.svg" alt="추가" width={17} height={17} />
            </span>
            <span>{state.loading ? '불러오는 중…' : '방 만들기'}</span>
          </button>
        </div>
      </MainTemplate>

      {/* 모달 */}
      <CreateRoomModal open={state.modalOpen} onClose={closeModal} onCreate={handleCreate} />
    </>
  );
};

export default memo(OnlineTemplate);
