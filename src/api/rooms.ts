'use client';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Room } from '@/types/room';

export const fetchRoomById = async (roomId: string): Promise<Room | null> => {
  const snap = await getDoc(doc(db, 'rooms', roomId));
  if (!snap.exists()) return null;
  return { id: roomId, ...(snap.data() as Omit<Room, 'id'>) };
};

// 🔐 비밀번호 서버 비교(정규화 + 공백 제거)
const normalize = (s: string) => s.normalize('NFC').trim();

export const verifyRoomPassword = async (roomId: string, typed: string): Promise<boolean> => {
  const room = await fetchRoomById(roomId);
  if (!room) return false; // 방 없음
  const saved = normalize(String(room.password ?? ''));
  const input = normalize(typed);
  if (!saved || !input) return false; // 비번 없거나 입력 공백
  return saved === input;
};
