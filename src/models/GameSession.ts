export interface Game {
  id: number;
  name: string;
  coverImage?: string;
  description?: string;
  genre?: string;
  platform?: string;
  publisher?: string;
  releaseDate?: string;
  isFavorite?: boolean;
}

export interface GameSession {
  id: number;
  gameId: number;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  notes?: string;
}

export interface GameStats {
  totalTime: number;
  sessionsCount: number;
  averageSessionTime: number;
  lastPlayed?: Date;
} 