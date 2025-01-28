import React from 'react';
import {IonContent,IonHeader,IonPage,IonTitle,IonToolbar,IonList,IonItem,IonLabel,IonThumbnail,IonNote,IonItemSliding,IonItemOptions,IonItemOption,IonButton,IonIcon} from '@ionic/react';
import { add, water, trash } from 'ionicons/icons';
import { Plant } from '../models/Plant';

const PlantsPage: React.FC = () => {
  const [plants, setPlants] = React.useState<Plant[]>([
    {
      id: 1,
      name: 'Ficus',
      species: 'Ficus elastica',
      lastWatered: new Date(),
      wateringFrequency: 7,
      health: 95,
    },
  ]);

  const getDaysUntilWatering = (plant: Plant) => {
    const today = new Date();
    const daysSinceWatering = Math.floor(
      (today.getTime() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, plant.wateringFrequency - daysSinceWatering);
  };

  const waterPlant = (plant: Plant) => {
    setPlants(plants.map(p => {
      if (p.id === plant.id) {
        return {
          ...p,
          lastWatered: new Date(),
          health: Math.min(100, p.health + 10),
        };
      }
      return p;
    }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mes Plantes</IonTitle>
          <IonButton slot="end">
            <IonIcon icon={add} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {plants.map(plant => (
            <IonItemSliding key={plant.id}>
              <IonItem>
                <IonThumbnail slot="start">
                  <img src={plant.image || '/assets/default-plant.jpg'} alt={plant.name} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{plant.name}</h2>
                  <p>{plant.species}</p>
                  <p>Santé: {plant.health}%</p>
                </IonLabel>
                <IonNote slot="end">
                  {getDaysUntilWatering(plant)} jours
                </IonNote>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => waterPlant(plant)}>
                  <IonIcon slot="icon-only" icon={water} />
                </IonItemOption>
                <IonItemOption color="danger">
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PlantsPage; 