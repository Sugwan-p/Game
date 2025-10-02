export interface Room {
  id: string;
  title: string;
  isPrivate: boolean;
  maxPlayers?: number;
  createdAt?: number; // ms
  password?: string | null;
  hostUid?: string;
}
