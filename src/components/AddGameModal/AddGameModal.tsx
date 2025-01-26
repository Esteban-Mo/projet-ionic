import React, { useState, useEffect, useCallback } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonSpinner,
  IonIcon,
  IonText
} from '@ionic/react';
import { searchGames, FreeGame } from '../../services/GameService';
import { NoImagePlaceholder } from '../NoImagePlaceholder/NoImagePlaceholder';
import { styles } from './AddGameModal.styles';
import debounce from 'lodash/debounce';
import { alertCircleOutline, refreshOutline } from 'ionicons/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddGame: (game: FreeGame) => void;
  onAddManualGame: (name: string) => void;
}

export const AddGameModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddGame,
  onAddManualGame
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<FreeGame[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim()) {
        setIsSearching(true);
        setSearchError(null);
        try {
          const results = await searchGames(query);
          setSearchResults(results);
        } catch (error) {
          setSearchError(
            error instanceof Error 
              ? error.message 
              : "Une erreur est survenue lors de la recherche"
          );
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setSearchError(null);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleClose = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSearchError(null);
    onClose();
  };

  const handleRetry = () => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter un jeu gratuit</IonTitle>
          <IonButton 
            slot="end" 
            fill="clear"
            onClick={handleClose}
          >
            Fermer
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchTerm}
          onIonInput={e => setSearchTerm(e.detail.value || '')}
          placeholder="Rechercher un jeu gratuit..."
          debounce={0}
          animated={true}
          style={styles.searchbar}
        />

        {isSearching && (
          <div style={styles.spinner}>
            <IonSpinner />
          </div>
        )}

        {searchError && (
          <div style={styles.error}>
            <IonIcon icon={alertCircleOutline} style={{ marginRight: '8px' }} />
            <IonText color="danger">{searchError}</IonText>
            <IonButton 
              fill="clear"
              onClick={handleRetry}
              style={{ marginLeft: '8px' }}
            >
              <IonIcon icon={refreshOutline} slot="icon-only" />
            </IonButton>
          </div>
        )}

        <IonList>
          {searchResults.map(game => (
            <IonItem key={game.id} button onClick={() => onAddGame(game)}>
              <IonThumbnail slot="start" style={styles.thumbnail}>
                {game.thumbnail && game.thumbnail !== 'N/A' ? (
                  <img 
                    src={game.thumbnail} 
                    alt={game.title}
                    style={styles.image}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <NoImagePlaceholder name={game.title} />
                )}
              </IonThumbnail>
              <IonLabel>
                <h2 style={styles.gameTitle}>{game.title}</h2>
                <p style={styles.gameInfo}>{game.genre} • {game.platform}</p>
                <p className="ion-text-wrap" style={styles.description}>
                  {game.short_description}
                </p>
                <p style={styles.publisher}>
                  {game.publisher} • {new Date(game.release_date).getFullYear()}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {!isSearching && searchResults.length === 0 && searchTerm.trim() && !searchError && (
          <IonButton 
            expand="block" 
            style={styles.addButton}
            onClick={() => onAddManualGame(searchTerm.trim())}
          >
            Ajouter manuellement "{searchTerm}"
          </IonButton>
        )}
      </IonContent>
    </IonModal>
  );
}; 