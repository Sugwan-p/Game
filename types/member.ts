export interface Member {
  uid: string;
  displayName: string;
  photoURL?: string | null;
  isReady?: boolean;
  joinedAt?: number;
}
