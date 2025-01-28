import { IonIcon } from '@ionic/react';
import { gameController } from 'ionicons/icons';
import { styles } from './NoImagePlaceholder.styles';

interface Props {
  name: string;
}

export const NoImagePlaceholder = (props: Props) => {
  const { name } = props;
  return (
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
}; 