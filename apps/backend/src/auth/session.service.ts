import { Session } from '@bb-companion/database';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSessionData, SessionResponse } from './types';

@Injectable()
export class SessionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async cleanupExpiredSessions(userId?: string): Promise<void> {
    const where = userId
      ? { userId, expiresAt: { lt: new Date() } }
      : { expiresAt: { lt: new Date() } };

    await this.databaseService.session.deleteMany({ where });
  }

  async createSession(data: CreateSessionData): Promise<void> {
    await this.cleanupExpiredSessions(data.userId);

    await this.databaseService.session.create({
      data: {
        userId: data.userId,
        token: data.token,
        deviceInfo: data.deviceInfo,
        ipAddress: data.ipAddress,
        createdAt: new Date(),
        expiresAt: data.rememberMe
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }

  async invalidateSession(token: string): Promise<void> {
    await this.databaseService.session.deleteMany({
      where: { token },
    });
  }

  async isSessionValid(token: string): Promise<boolean> {
    const session = await this.databaseService.session.findFirst({
      where: {
        token,
        expiresAt: { gt: new Date() },
      },
    });

    return !!session;
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    await this.databaseService.session.deleteMany({
      where: {
        userId,
      },
    });
  }

  async getUserActiveSessions(userId: string): Promise<SessionResponse[]> {
    return this.databaseService.session.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      select: {
        id: true,
        deviceInfo: true,
        ipAddress: true,
        createdAt: true,
        expiresAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSessionByToken(token: string): Promise<Session | null> {
    return this.databaseService.session.findFirst({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  }
}
