'use client';

import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/auth';
import { db } from '@/lib/firebase'; // 기존 firebase 초기화 사용
import type { Member } from '@/types/member';
import type { Room } from '@/types/room';

export const subscribeRoom = (roomId: string, onData: (room?: Room) => void): Unsubscribe =>
  onSnapshot(doc(db, 'rooms', roomId), (snap) =>
    onData(snap.exists() ? { id: roomId, ...(snap.data() as Omit<Room, 'id'>) } : undefined),
  );

export const subscribeMembers = (
  roomId: string,
  onData: (members: Member[]) => void,
): Unsubscribe =>
  onSnapshot(collection(db, 'rooms', roomId, 'members'), (snap) => {
    const list = snap.docs
      .map((d) => d.data() as Member)
      .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));
    onData(list);
  });

export const joinRoom = async (roomId: string, me: Member) =>
  setDoc(doc(db, 'rooms', roomId, 'members', me.uid), {
    ...me,
    joinedAt: me.joinedAt || Date.now(),
  });

export const leaveRoom = async (roomId: string, uid: string) =>
  deleteDoc(doc(db, 'rooms', roomId, 'members', uid));

export const setReady = async (roomId: string, me: Member, isReady: boolean) =>
  setDoc(
    doc(db, 'rooms', roomId, 'members', me.uid),
    { ...me, isReady, joinedAt: me.joinedAt || Date.now(), touchedAt: serverTimestamp() },
    { merge: true },
  );
