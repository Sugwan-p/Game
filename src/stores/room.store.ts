'use client';

import { create } from 'zustand';
import type { Room } from '@/types/room';
import type { Member } from '@/types/member';

type RoomState = {
  loading: boolean;
  room?: Room;
  members: Member[];
  me?: Member;
};

type RoomActions = {
  setLoading: (v: boolean) => void;
  setRoom: (room?: Room) => void;
  setMembers: (arr: Member[]) => void;
  setMe: (me?: Member) => void;
  reset: () => void;
};

const INITIAL: RoomState = { loading: true, room: undefined, members: [], me: undefined };

export const useRoomStore = create<RoomState & RoomActions>((set) => ({
  ...INITIAL,
  setLoading: (v) => set({ loading: v }),
  setRoom: (room) => set({ room }),
  setMembers: (members) => set({ members }),
  setMe: (me) => set({ me }),
  reset: () => set({ ...INITIAL }),
}));
