'use client';

import { create } from 'zustand';

export type JoinFn = (roomId: string) => void;
export type VerifyFn = (roomId: string, typed: string) => Promise<boolean>;

export type PasswordModalState = {
  isOpen: boolean;
  roomId: string;
  requiredPassword?: string | null; // 리스트에 비번이 없을 수도 있음
  error: string;
  onJoinAfterValidate?: JoinFn;
  verifyPassword?: VerifyFn;
};

export type PasswordModalActions = {
  open: (payload: {
    roomId: string;
    requiredPassword?: string | null;
    onJoinAfterValidate?: JoinFn;
    verifyPassword?: VerifyFn;
  }) => void;
  close: () => void;
  setError: (msg: string) => void;
  reset: () => void;
};

export type PasswordModalStore = PasswordModalState & PasswordModalActions;

const INITIAL_STATE: PasswordModalState = {
  isOpen: false,
  roomId: '',
  requiredPassword: undefined,
  error: '',
  onJoinAfterValidate: undefined,
  verifyPassword: undefined,
};

export const usePasswordModalStore = create<PasswordModalStore>((set) => ({
  ...INITIAL_STATE,

  open: ({ roomId, requiredPassword, onJoinAfterValidate, verifyPassword }) =>
    set({
      isOpen: true,
      roomId,
      requiredPassword,
      error: '',
      onJoinAfterValidate,
      verifyPassword,
    }),

  close: () => set({ isOpen: false }),
  setError: (msg: string) => set({ error: msg }),
  reset: () => set({ ...INITIAL_STATE }),
}));
