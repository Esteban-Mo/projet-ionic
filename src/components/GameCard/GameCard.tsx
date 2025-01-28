import React, { useState } from 'react';
import { IonCard, IonButton, IonIcon } from '@ionic/react';
import { stopwatch, time, trash, star, starOutline, camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Game, GameStats } from '../../models/GameSession';
import { NoImagePlaceholder } from '../NoImagePlaceholder/NoImagePlaceholder';
import { styles } from './GameCard.styles';
import { EditTimeModal } from '../EditTimeModal/EditTimeModal';

interface Props {
  game: Game;
  stats: GameStats;
  isActiveGame: boolean;
  hasActiveSession: boolean;
  currentSessionTime: string;
  onStartSession: () => void;
  onEndSession: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
  onEditTime: (hours: number, minutes: number) => void;
  formatDuration: (minutes: number) => string;
  onUpdateImage: (gameId: number, newImage: string) => void;
}


const getBadgeInfo = (totalHours: number): { label: string; color: string; icon: string } => {
  if (totalHours >= 50) return { label: 'Expert', color: 'var(--ion-color-warning)', icon: '🏆' };
  if (totalHours >= 10) return { label: 'Passionné', color: 'var(--ion-color-success)', icon: '🎮' };
  if (totalHours >= 2) return { label: 'Amateur', color: 'var(--ion-color-primary)', icon: '🎯' };
  return { label: 'Débutant', color: 'var(--ion-color-medium)', icon: '🌟' };
};

const formatLastPlayed = (date?: Date): string => {
  if (!date) return 'Pas encore joué';
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Aujourd\'hui';
  if (days === 1) return 'Hier';
  if (days < 7) return `Il y a ${days} jours`;
  if (days < 30) return `Il y a ${Math.floor(days / 7)} semaine${Math.floor(days / 7) > 1 ? 's' : ''}`;
  return `Il y a ${Math.floor(days / 30)} mois`;
}; 

export const GameCard: React.FC<Props> = (props: Props) => {
  const { game, stats, isActiveGame, hasActiveSession, currentSessionTime, onStartSession, onEndSession, onDelete, onToggleFavorite, onEditTime, formatDuration, onUpdateImage } = props;
  const [showEditTimeModal, setShowEditTimeModal] = useState(false);
  const totalHours = stats.totalTime / 60;
  const badge = getBadgeInfo(totalHours);
  const averageSessionTime = stats.sessionsCount > 0 ? stats.totalTime / stats.sessionsCount : 0;

  const handleImageClick = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (image.dataUrl) {
        onUpdateImage(game.id, image.dataUrl);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image:', error);
    }
  };

  return (
    <IonCard style={styles.card}>
      <div style={styles.container}>
        <div style={styles.imageContainer} onClick={handleImageClick}>
          {game.coverImage && game.coverImage !== 'N/A' ? (
            <img
              src={game.coverImage}
              alt={game.name}
              style={styles.image}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <NoImagePlaceholder name={game.name} />
          )}
          <div style={styles.imageOverlay}>
            <IonIcon icon={camera} style={styles.cameraIcon} />
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.header}>
            <div>
              <h2 style={styles.title}>{game.name}</h2>
              {game.genre && (
                <div style={styles.genre}>{game.genre}</div>
              )}
            </div>
            <div style={styles.actionButtons}>
              <IonButton
                fill="clear"
                color={game.isFavorite ? 'warning' : 'medium'}
                onClick={onToggleFavorite}
                style={{
                  ...styles.iconButton,
                  opacity: game.isFavorite ? 1 : 0.6
                }}
              >
                <IonIcon
                  icon={game.isFavorite ? star : starOutline}
                  style={{ fontSize: '1.2em' }}
                />
              </IonButton>
              <IonButton
                fill="clear"
                color="medium"
                onClick={onDelete}
                style={{
                  ...styles.iconButton,
                  opacity: 0.6
                }}
              >
                <IonIcon
                  icon={trash}
                  style={{ fontSize: '1.1em' }}
                />
              </IonButton>
            </div>
          </div>

          <div style={styles.badge(badge.color)}>
            <span style={{ fontSize: '1.2em' }}>{badge.icon}</span>
            <span style={{ fontWeight: '500' }}>{badge.label}</span>
          </div>

          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={{ ...styles.statValue, color: 'var(--ion-color-primary)' }}>
                {stats.sessionsCount}
              </div>
              <div style={styles.statLabel}>Sessions</div>
            </div>
            <div style={styles.statItem}>
              <div
                onClick={() => setShowEditTimeModal(true)}
                style={{ ...styles.statValue, ...styles.editableTime, color: 'var(--ion-color-secondary)' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ion-color-light)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {formatDuration(stats.totalTime)}
              </div>
              <div style={styles.statLabel}>Temps total</div>
            </div>
          </div>

          <div style={styles.detailsBox}>
            <div style={styles.detailRow}>
              <span style={{ color: 'var(--ion-color-medium)' }}>Moyenne par session:</span>
              <span style={{ fontWeight: '500' }}>{formatDuration(averageSessionTime)}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={{ color: 'var(--ion-color-medium)' }}>Dernière session:</span>
              <span style={{ fontWeight: '500' }}>{formatLastPlayed(stats.lastPlayed)}</span>
            </div>
          </div>

          {isActiveGame && (
            <div style={styles.activeSession}>
              Session en cours: {currentSessionTime}
            </div>
          )}

          {isActiveGame ? (
            <IonButton
              expand="block"
              color="danger"
              onClick={onEndSession}
              style={{ '--border-radius': '12px', marginBottom: '0' }}
            >
              <IonIcon icon={stopwatch} slot="start" />
              Arrêter la session
            </IonButton>
          ) : (
            <IonButton
              expand="block"
              onClick={onStartSession}
              disabled={hasActiveSession}
              style={{
                '--border-radius': '12px',
                marginBottom: '0',
                opacity: hasActiveSession ? '0.5' : '1'
              }}
            >
              <IonIcon icon={time} slot="start" />
              {hasActiveSession ? 'Session en cours sur un autre jeu' : 'Démarrer une session'}
            </IonButton>
          )}
        </div>
      </div>

      <EditTimeModal
        isOpen={showEditTimeModal}
        onClose={() => setShowEditTimeModal(false)}
        initialHours={Math.floor(stats.totalTime / 60)}
        initialMinutes={Math.round(stats.totalTime % 60)}
        onSave={(hours, minutes) => {
          onEditTime(hours, minutes);
          setShowEditTimeModal(false);
        }}
      />
    </IonCard>
  );
};