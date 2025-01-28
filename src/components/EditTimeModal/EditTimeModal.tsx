import { useState } from 'react';
import { IonModal, IonButton } from '@ionic/react';
import { styles } from './EditTimeModal.styles';
import { commonStyles } from '../../styles/common.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hours: number, minutes: number) => void;
  initialHours: number;
  initialMinutes: number;
}

export const EditTimeModal = (props: Props) => {
  const { isOpen, onClose, onSave, initialHours, initialMinutes } = props;
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose}
      className="auto-height"
      style={commonStyles.modalBase}
    >
      <div style={styles.container}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={styles.title}>
            Éditer le temps de jeu
          </h3>
          <div style={styles.inputContainer}>
            <div style={styles.inputGroup}>
              <input
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                style={styles.input}
              />
              <span style={styles.inputLabel}>
                Heures
              </span>
            </div>
            <div style={styles.separator}>:</div>
            <div style={styles.inputGroup}>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                style={styles.input}
              />
              <span style={styles.inputLabel}>
                Minutes
              </span>
            </div>
          </div>
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
            onClick={() => onSave(hours, minutes)}
            style={commonStyles.button}
          >
            Enregistrer
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
}; 