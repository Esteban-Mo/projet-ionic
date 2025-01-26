import React from 'react';
import { IonIcon } from '@ionic/react';
import { gameController } from 'ionicons/icons';
import { styles } from './NoImagePlaceholder.styles';

interface Props {
  name: string;
}

export const NoImagePlaceholder: React.FC<Props> = ({ name }) => (
  <div style={styles.container}>
    <IonIcon 
      icon={gameController} 
      style={styles.icon}
    />
    <div style={styles.text}>
      {name}
    </div>
  </div>
); 