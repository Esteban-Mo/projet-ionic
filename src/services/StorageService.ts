import { Game, GameSession } from '../models/GameSession';

const STORAGE_KEYS = {
  GAMES: 'game-tracker-games',
  SESSIONS: 'game-tracker-sessions',
  ACTIVE_SESSION: 'game-tracker-active-session'
};

export const StorageService = {
  // Sauvegarder les données
  saveGames: (games: Game[]) => {
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
  },

  saveSessions: (sessions: GameSession[]) => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  saveActiveSession: (session: GameSession | null) => {
    if (session) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
  },

  // Charger les données
  loadGames: (): Game[] => {
    const gamesStr = localStorage.getItem(STORAGE_KEYS.GAMES);
    return gamesStr ? JSON.parse(gamesStr) : [];
  },

  loadSessions: (): GameSession[] => {
    const sessionsStr = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!sessionsStr) return [];
    
    const sessions: GameSession[] = JSON.parse(sessionsStr);
    // Convertir les chaînes de date en objets Date
    return sessions.map(session => ({
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined
    }));
  },

  loadActiveSession: (): GameSession | null => {
    const sessionStr = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!sessionStr) return null;
    
    const session: GameSession = JSON.parse(sessionStr);
    // Convertir les chaînes de date en objets Date
    return {
      ...session,
      startTime: new Date(session.startTime),
      endTime: session.endTime ? new Date(session.endTime) : undefined
    };
  },

  // Effacer toutes les données
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.GAMES);
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  },

  updateGameImage: (gameId: number, newImage: string) => {
    const games = StorageService.loadGames();
    const updatedGames = games.map(game => 
      game.id === gameId 
        ? { ...game, coverImage: newImage }
        : game
    );
    StorageService.saveGames(updatedGames);
    return updatedGames;
  }
}; 