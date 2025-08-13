import { Session } from '@bb-companion/database';

export type SessionResponse = Pick<
  Session,
  'id' | 'deviceInfo' | 'ipAddress' | 'createdAt' | 'expiresAt'
>;
export type CreateSessionData = {
  userId: string;
  token: string;
  deviceInfo?: string;
  ipAddress?: string;
  rememberMe?: boolean;
};
