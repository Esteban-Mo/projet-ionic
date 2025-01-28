import { useState, useEffect } from 'react';
import { IonModal, IonButton, IonInput, IonTextarea, IonText } from '@ionic/react';
import { commonStyles } from '../../styles/common.styles';
import { Game } from '../../models/GameSession';
import { styles } from './EditGameModal.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (game: Game) => void;
  game: Game;
}

export const EditGameModal = (props: Props) => {
  const { isOpen, onClose, onSave, game } = props;
  const [name, setName] = useState(game.name);
  const [description, setDescription] = useState(game.description || '');
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  useEffect(() => {
    setName(game.name);
    setDescription(game.description || '');
    setErrors({});
  }, [game]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Le nom du jeu est requis';
    } else if (name.length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    } else if (name.length > 30) {
      newErrors.name = 'Le nom ne doit pas dépasser 30 caractères';
    }

    if (description.length > 200) {
      newErrors.description = 'La description ne doit pas dépasser 200 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation en temps réel
  useEffect(() => {
    validateForm();
  }, [name, description]);

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...game,
        name: name.trim(),
        description: description.trim() || undefined
      });
    }
  };

  const isFormValid = () => {
    return name.trim().length >= 2 && 
           name.trim().length <= 30 && 
           description.length <= 200;
  };

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose}
      className="auto-height"
      style={commonStyles.modalBase}
    >
      <div style={styles.container}>
        <h3 style={styles.title}>
          Modifier le jeu
        </h3>

        <div style={styles.formGroup}>
          <IonInput
            label="Nom du jeu *"
            labelPlacement="stacked"
            value={name}
            onIonInput={e => setName(e.detail.value || '')}
            className={errors.name ? 'ion-invalid' : ''}
            errorText={errors.name}
            counter={true}
            maxlength={30}
            minlength={2}
            required
          />
          {errors.name && (
            <IonText color="danger" style={styles.errorText}>
              {errors.name}
            </IonText>
          )}
        </div>

        <div style={styles.formGroup}>
          <IonTextarea
            label="Description"
            labelPlacement="stacked"
            value={description}
            onIonInput={e => setDescription(e.detail.value || '')}
            className={errors.description ? 'ion-invalid' : ''}
            errorText={errors.description}
            counter={true}
            maxlength={200}
            autoGrow={true}
            rows={3}
          />
          {errors.description && (
            <IonText color="danger" style={styles.errorText}>
              {errors.description}
            </IonText>
          )}
        </div>

        <div style={styles.buttonGroup}>
          <IonButton
            expand="block"
            fill="outline"
            color="medium"
            onClick={onClose}
            style={commonStyles.button}
          >
            Annuler
          </IonButton>
          <IonButton
            expand="block"
            onClick={handleSave}
            style={commonStyles.button}
            disabled={!isFormValid()}
          >
            Enregistrer
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
}; 