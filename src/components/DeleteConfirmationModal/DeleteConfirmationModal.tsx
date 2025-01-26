import React from 'react';
import { IonModal, IonButton } from '@ionic/react';
import { styles } from './DeleteConfirmationModal.styles';
import { commonStyles } from '../../styles/common.styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  gameName: string;
}

export const DeleteConfirmationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  gameName
}) => {
  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose}
      className="modal-delete"
      style={{
        ...commonStyles.modalBase,
        '--height': 'auto',
        '--width': '90%',
        '--max-width': '300px'
      }}
    >
      <div style={styles.container}>
        <div style={styles.content}>
          <h3 style={styles.title}>
            Supprimer {gameName} ?
          </h3>
          <p style={styles.description}>
            Les sessions associées seront également supprimées.
          </p>
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
            color="danger"
            onClick={onConfirm}
            style={commonStyles.button}
          >
            Supprimer
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
}; 