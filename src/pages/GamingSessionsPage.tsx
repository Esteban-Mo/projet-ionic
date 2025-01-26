import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonFab,
  IonFabButton,
  IonModal,
  IonSearchbar,
  IonThumbnail,
  IonSpinner,
} from '@ionic/react';
import { add, stopwatch, time, gameController } from 'ionicons/icons';
import { Game, GameSession, GameStats } from '../models/GameSession';
import { searchGames, FreeGame } from '../services/GameService';
import debounce from 'lodash/debounce';

const NoImagePlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--ion-color-primary) 0%, var(--ion-color-secondary) 100%)',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  }}>
    <IonIcon 
      icon={gameController} 
      style={{ 
        fontSize: '3em',
        marginBottom: '10px',
        opacity: '0.8'
      }} 
    />
    <div style={{ 
      fontSize: '0.9em',
      wordBreak: 'break-word',
      opacity: '0.9',
      fontWeight: '500'
    }}>
      {name}
    </div>
  </div>
);

const GameCard: React.FC<{
  game: Game;
  stats: GameStats;
  isActiveGame: boolean;
  currentSessionTime: string;
  onStartSession: () => void;
  onEndSession: () => void;
}> = ({ game, stats, isActiveGame, currentSessionTime, onStartSession, onEndSession }) => (
  <IonCard style={{ 
    margin: '16px', 
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }}>
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--ion-background-color)',
      height: '100%'
    }}>
      <div style={{ 
        position: 'relative',
        paddingTop: '56.25%', // Ratio 16:9
        overflow: 'hidden',
        backgroundColor: 'var(--ion-color-step-50)'
      }}>
        {game.coverImage && game.coverImage !== 'N/A' ? (
          <img 
            src={game.coverImage} 
            alt={game.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <NoImagePlaceholder name={game.name} />
        )}
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ 
            margin: '0 0 8px 0',
            fontSize: '1.4em',
            fontWeight: '600'
          }}>
            {game.name}
          </h2>
          {game.genre && (
            <div style={{ 
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '12px',
              backgroundColor: 'var(--ion-color-primary)',
              color: 'white',
              fontSize: '0.8em',
              fontWeight: '500'
            }}>
              {game.genre}
            </div>
          )}
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '1.2em', 
              fontWeight: '600',
              color: 'var(--ion-color-primary)'
            }}>
              {stats.totalTime}
            </div>
            <div style={{ 
              fontSize: '0.8em',
              color: 'var(--ion-color-medium)',
              marginTop: '4px'
            }}>
              Total
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '1.2em', 
              fontWeight: '600',
              color: 'var(--ion-color-secondary)'
            }}>
              {stats.sessionsCount}
            </div>
            <div style={{ 
              fontSize: '0.8em',
              color: 'var(--ion-color-medium)',
              marginTop: '4px'
            }}>
              Sessions
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '1.2em', 
              fontWeight: '600',
              color: 'var(--ion-color-tertiary)'
            }}>
              {stats.averageSessionTime}
            </div>
            <div style={{ 
              fontSize: '0.8em',
              color: 'var(--ion-color-medium)',
              marginTop: '4px'
            }}>
              Moyenne
            </div>
          </div>
        </div>

        {isActiveGame && (
          <div style={{ 
            marginBottom: '20px',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: 'var(--ion-color-warning)',
            color: 'white',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: '1.1em'
          }}>
            Session en cours: {currentSessionTime}
          </div>
        )}

        {isActiveGame ? (
          <IonButton 
            expand="block"
            color="danger"
            onClick={onEndSession}
            style={{ 
              '--border-radius': '12px',
              marginBottom: '0'
            }}
          >
            <IonIcon icon={stopwatch} slot="start" />
            Arrêter la session
          </IonButton>
        ) : (
          <IonButton 
            expand="block"
            onClick={onStartSession}
            style={{ 
              '--border-radius': '12px',
              marginBottom: '0'
            }}
          >
            <IonIcon icon={time} slot="start" />
            Démarrer une session
          </IonButton>
        )}
      </div>
    </div>
  </IonCard>
);

const GamingSessionsPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([
    { id: 1, name: 'The Witcher 3', coverImage: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Cyberpunk 2077', coverImage: 'https://via.placeholder.com/150' },
  ]);

  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [activeSession, setActiveSession] = useState<GameSession | null>(null);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [newGameName, setNewGameName] = useState('');
  const [currentSessionTime, setCurrentSessionTime] = useState<string>('00:00:00');
  const [searchResults, setSearchResults] = useState<FreeGame[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

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

  const addNewGame = () => {
    if (newGameName.trim()) {
      const newGame: Game = {
        id: games.length + 1,
        name: newGameName.trim(),
      };
      setGames([...games, newGame]);
      setNewGameName('');
      setShowNewGameModal(false);
    }
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Modification de la fonction debouncedSearch
  const debouncedSearch = debounce(async (query: string) => {
    if (query.trim()) {
      setIsSearching(true);
      setSearchError(null);
      try {
        const results = await searchGames(query);
        setSearchResults(results);
      } catch (error) {
        setSearchError("Erreur lors de la recherche. Veuillez réessayer.");
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setSearchError(null);
    }
  }, 300);

  const handleSearch = (value: string) => {
    setNewGameName(value);
    debouncedSearch(value);
  };

  const selectGame = (freeGame: FreeGame) => {
    const newGame: Game = {
      id: games.length + 1,
      name: freeGame.title,
      coverImage: freeGame.thumbnail,
      description: freeGame.short_description,
      genre: freeGame.genre,
      platform: freeGame.platform,
    };
    setGames([...games, newGame]);
    setNewGameName('');
    setSearchResults([]);
    setShowNewGameModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--padding-top': '8px', '--padding-bottom': '8px' }}>
          <IonTitle style={{ fontSize: '1.4em', fontWeight: '600' }}>
            Mes Sessions de Jeu
          </IonTitle>
          <IonButton 
            slot="end" 
            fill="clear"
            onClick={() => setShowNewGameModal(true)}
          >
            <IonIcon icon={add} slot="icon-only" style={{ fontSize: '1.4em' }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '8px',
          padding: '8px'
        }}>
          {games.map(game => {
            const stats = calculateGameStats(game.id);
            const isActiveGame = activeSession?.gameId === game.id;
            
            return (
              <GameCard
                key={game.id}
                game={game}
                stats={stats}
                isActiveGame={isActiveGame}
                currentSessionTime={currentSessionTime}
                onStartSession={() => startSession(game.id)}
                onEndSession={endSession}
              />
            );
          })}
        </div>

        <IonModal isOpen={showNewGameModal} onDidDismiss={() => setShowNewGameModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Ajouter un jeu gratuit</IonTitle>
              <IonButton 
                slot="end" 
                fill="clear"
                onClick={() => setShowNewGameModal(false)}
              >
                Fermer
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonSearchbar
              value={newGameName}
              onIonInput={e => handleSearch(e.detail.value || '')}
              placeholder="Rechercher un jeu gratuit..."
              debounce={300}
            />

            {isSearching && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <IonSpinner />
              </div>
            )}

            {searchError && (
              <div style={{ 
                color: 'var(--ion-color-danger)', 
                padding: '10px', 
                textAlign: 'center' 
              }}>
                {searchError}
              </div>
            )}

            <IonList>
              {searchResults.map(game => (
                <IonItem key={game.id} button onClick={() => selectGame(game)}>
                  <IonThumbnail slot="start" style={{ width: '80px', height: '80px' }}>
                    {game.thumbnail && game.thumbnail !== 'N/A' ? (
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement?.querySelector('.placeholder')?.classList.remove('hidden');
                        }}
                      />
                    ) : (
                      <NoImagePlaceholder name={game.title} />
                    )}
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{game.title}</h2>
                    <p>{game.genre} • {game.platform}</p>
                    <p className="ion-text-wrap" style={{ fontSize: '0.8em', color: 'var(--ion-color-medium)' }}>
                      {game.short_description}
                    </p>
                    <p style={{ fontSize: '0.8em' }}>
                      {game.publisher} • {new Date(game.release_date).getFullYear()}
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>

            {!isSearching && searchResults.length === 0 && newGameName.trim() && !searchError && (
              <IonButton 
                expand="block" 
                style={{ margin: '10px' }}
                onClick={addNewGame}
              >
                Ajouter manuellement "{newGameName}"
              </IonButton>
            )}
          </IonContent>
        </IonModal>

        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ margin: '16px' }}>
          <IonFabButton 
            onClick={() => setShowNewGameModal(true)}
            style={{ '--border-radius': '16px' }}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default GamingSessionsPage; 