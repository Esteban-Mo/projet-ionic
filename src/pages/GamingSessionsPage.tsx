import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { Game, GameSession, GameStats } from '../models/GameSession';
import { FreeGame } from '../services/GameService';
import { StorageService } from '../services/StorageService';
import { GameCard } from '../components/GameCard/GameCard';
import { AddGameModal } from '../components/AddGameModal/AddGameModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal/DeleteConfirmationModal';
import { styles } from './GamingSessionsPage.styles';

const GamingSessionsPage: React.FC = () => {
  // États
  const [games, setGames] = useState<Game[]>(() => StorageService.loadGames());
  const [sessions, setSessions] = useState<GameSession[]>(() => StorageService.loadSessions());
  const [activeSession, setActiveSession] = useState<GameSession | null>(() => StorageService.loadActiveSession());
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [currentSessionTime, setCurrentSessionTime] = useState<string>('00:00:00');
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  // Gestion du temps de session active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeSession) {
      interval = setInterval(() => {
        const startTime = new Date(activeSession.startTime).getTime();
        const now = new Date().getTime();
        const diff = now - startTime;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setCurrentSessionTime(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeSession]);

  // Persistance des données
  useEffect(() => {
    StorageService.saveGames(games);
  }, [games]);

  useEffect(() => {
    StorageService.saveSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    StorageService.saveActiveSession(activeSession);
  }, [activeSession]);

  // Fonctions de gestion des sessions
  const startSession = (gameId: number) => {
    const newSession: GameSession = {
      id: sessions.length + 1,
      gameId,
      startTime: new Date(),
    };
    setActiveSession(newSession);
    setSessions([...sessions, newSession]);
    setCurrentSessionTime('00:00:00');
  };

  const endSession = () => {
    if (activeSession) {
      const endTime = new Date();
      const updatedSessions = sessions.map(session => {
        if (session.id === activeSession.id) {
          const duration = Math.round(
            (endTime.getTime() - session.startTime.getTime()) / 60000
          );
          return { ...session, endTime, duration };
        }
        return session;
      });
      setSessions(updatedSessions);
      setActiveSession(null);
      setCurrentSessionTime('00:00:00');
    }
  };

  // Formatage du temps
  const formatDuration = (minutes: number, hasPlayed: boolean = false): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    
    if (hours === 0 && mins === 0) {
      return hasPlayed ? "< 1m" : "0";
    }
    
    if (hours === 0) {
      return `${mins}m`;
    }
    
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  };

  // Calcul des statistiques
  const calculateGameStats = (gameId: number): GameStats => {
    const gamesSessions = sessions.filter(s => s.gameId === gameId && s.endTime);
    const totalTime = gamesSessions.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    return {
      totalTime,
      sessionsCount: gamesSessions.length,
      averageSessionTime: gamesSessions.length ? totalTime / gamesSessions.length : 0,
      lastPlayed: gamesSessions.length ? gamesSessions[gamesSessions.length - 1].endTime : undefined,
    };
  };

  // Gestion des jeux
  const addGame = (freeGame: FreeGame) => {
    const newGame: Game = {
      id: games.length + 1,
      name: freeGame.title,
      coverImage: freeGame.thumbnail,
      description: freeGame.short_description,
      genre: freeGame.genre,
      platform: freeGame.platform,
    };
    setGames([...games, newGame]);
    setShowNewGameModal(false);
  };

  const addManualGame = (name: string) => {
    const newGame: Game = {
      id: games.length + 1,
      name: name.trim(),
    };
    setGames([...games, newGame]);
    setShowNewGameModal(false);
  };

  const deleteGame = (game: Game) => {
    const updatedSessions = sessions.filter(session => session.gameId !== game.id);
    setSessions(updatedSessions);

    if (activeSession?.gameId === game.id) {
      setActiveSession(null);
      setCurrentSessionTime('00:00:00');
    }

    const updatedGames = games.filter(g => g.id !== game.id);
    setGames(updatedGames);
    setGameToDelete(null);
  };

  const toggleFavorite = (gameId: number) => {
    const updatedGames = games.map(game => 
      game.id === gameId ? { ...game, isFavorite: !game.isFavorite } : game
    );
    setGames(updatedGames);
  };

  const editGameTime = (gameId: number, hours: number, minutes: number) => {
    const totalMinutes = hours * 60 + minutes;
    const gamesSessions = sessions.filter(s => s.gameId === gameId && s.endTime);
    
    if (gamesSessions.length > 0) {
      const updatedSessions = [...sessions];
      const lastSession = gamesSessions[gamesSessions.length - 1];
      const newDuration = totalMinutes - gamesSessions.slice(0, -1).reduce((acc, curr) => acc + (curr.duration || 0), 0);
      
      const sessionIndex = updatedSessions.findIndex(s => s.id === lastSession.id);
      if (sessionIndex !== -1) {
        updatedSessions[sessionIndex] = {
          ...lastSession,
          duration: Math.max(0, newDuration)
        };
        setSessions(updatedSessions);
      }
    } else if (totalMinutes > 0) {
      const newSession: GameSession = {
        id: sessions.length + 1,
        gameId,
        startTime: new Date(),
        endTime: new Date(),
        duration: totalMinutes
      };
      setSessions([...sessions, newSession]);
    }
  };

  // Tri des jeux
  const sortedGames = [...games].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) {
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    }
    return a.isFavorite ? -1 : 1;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={styles.toolbar}>
          <IonTitle style={styles.title}>
            Mes Sessions de Jeu
          </IonTitle>
          <IonButton 
            slot="end" 
            fill="clear"
            onClick={() => setShowNewGameModal(true)}
          >
            <IonIcon icon={add} slot="icon-only" style={styles.addButton} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={styles.gamesGrid}>
          {sortedGames.map(game => {
            const stats = calculateGameStats(game.id);
            const isActiveGame = activeSession?.gameId === game.id;
            
            return (
              <GameCard
                key={game.id}
                game={game}
                stats={stats}
                isActiveGame={isActiveGame}
                hasActiveSession={!!activeSession}
                currentSessionTime={currentSessionTime}
                onStartSession={() => startSession(game.id)}
                onEndSession={endSession}
                onDelete={() => setGameToDelete(game)}
                onToggleFavorite={() => toggleFavorite(game.id)}
                onEditTime={(hours, minutes) => editGameTime(game.id, hours, minutes)}
                formatDuration={(minutes) => formatDuration(minutes, stats.sessionsCount > 0)}
              />
            );
          })}
        </div>

        <AddGameModal
          isOpen={showNewGameModal}
          onClose={() => setShowNewGameModal(false)}
          onAddGame={addGame}
          onAddManualGame={addManualGame}
          existingGames={games}
        />

        <DeleteConfirmationModal
          isOpen={!!gameToDelete}
          onClose={() => setGameToDelete(null)}
          onConfirm={() => gameToDelete && deleteGame(gameToDelete)}
          gameName={gameToDelete?.name || ''}
        />

        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={styles.fab}>
          <IonFabButton onClick={() => setShowNewGameModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default GamingSessionsPage; 