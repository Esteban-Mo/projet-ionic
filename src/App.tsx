import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { gameController, stopwatch, statsChart, barChartOutline } from 'ionicons/icons';
import GamingSessionsPage from './pages/GamingSessionsPage';
import StatisticsPage from './pages/StatisticsPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => {
  // Appliquer le thème sombre par défaut
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/games">
              <GamingSessionsPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/games" />
            </Route>
            <Route exact path="/tab2">
              <StatisticsPage />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="games" href="/games">
              <IonIcon icon={gameController} />
              <IonLabel>Mes Jeux</IonLabel>
            </IonTabButton>
            <IonTabButton tab="sessions" href="/sessions">
              <IonIcon icon={stopwatch} />
              <IonLabel>Sessions</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={barChartOutline} />
              <IonLabel>Statistiques</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
