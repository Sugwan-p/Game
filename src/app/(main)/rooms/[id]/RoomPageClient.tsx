'use client';

import { useEffect, useMemo, useCallback } from 'react';
import type { Room } from '@/types/room';
import type { Member } from '@/types/member';
import { useRoomStore } from '@/stores/room.store';
import {
  subscribeRoom,
  subscribeMembers,
  joinRoom,
  leaveRoom,
  setReady,
} from '@/api/rooms.realtime';
import RoomWaitingTemplate from '@/components/templates/RoomWaitingTemplate';

type Props = { roomId: string };

export default function RoomPageClient({ roomId }: Props) {
  const { room, members, me, setLoading, setRoom, setMembers, setMe, reset } = useRoomStore();

  const currentUser: Member = useMemo(
    () => ({ uid: 'me', displayName: '나', photoURL: null, isReady: false }),
    [],
  );

  const capacity = room?.maxPlayers ?? 4;
  const isHost = room ? currentUser.uid === room.hostUid : false;
  const full = members.length >= capacity;
  const everyoneReady = members.length > 0 ? members.every((m) => m.isReady) : false;
  const canStart = isHost && full && everyoneReady;

  const handleStart = useCallback(() => {
    alert('게임 시작!');
  }, []);

  const toggleReady = useCallback(async () => {
    if (!room) return;
    await setReady(roomId, currentUser, !me?.isReady);
  }, [room, roomId, currentUser, me]);

  useEffect(() => {
    setLoading(true);
    const unsubs = [
      subscribeRoom(roomId, (r?: Room) => setRoom(r)),
      subscribeMembers(roomId, (arr: Member[]) => setMembers(arr)),
    ];
    joinRoom(roomId, currentUser).then(() => setMe(currentUser));
    setLoading(false);
    return () => {
      unsubs.forEach((u) => u());
      leaveRoom(roomId, currentUser.uid);
      reset();
    };
  }, [roomId, currentUser, setLoading, setRoom, setMembers, setMe, reset]);

  return (
    <RoomWaitingTemplate
      room={room}
      members={members}
      me={me}
      capacity={capacity}
      isHost={isHost}
      canStart={canStart}
      onToggleReady={toggleReady}
      onStart={handleStart}
    />
  );
}
