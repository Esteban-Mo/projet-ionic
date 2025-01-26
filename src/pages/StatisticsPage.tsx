import React, { useMemo, useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  useIonViewWillEnter,
} from '@ionic/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Game, GameSession } from '../models/GameSession';
import { StorageService } from '../services/StorageService';
import { styles } from './StatisticsPage.styles';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9A8194', '#392F5A', '#31A9B8', '#258039',
];

const PERIODS = [
  { name: 'Matin (5h-12h)', start: 5, end: 12, shortName: 'Matin' },
  { name: 'Après-midi (12h-18h)', start: 12, end: 18, shortName: 'Après-midi' },
  { name: 'Soir (18h-23h)', start: 18, end: 23, shortName: 'Soir' },
  { name: 'Nuit (23h-5h)', start: 23, end: 5, shortName: 'Nuit' }
];

const StatisticsPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [sessions, setSessions] = useState<GameSession[]>([]);

  // Se déclenche à chaque fois que la page devient visible
  useIonViewWillEnter(() => {
    setGames(StorageService.loadGames());
    setSessions(StorageService.loadSessions());
  });

  // Statistiques par jour de la semaine
  const playTimeByDay = useMemo(() => {
    const dayStats = DAYS.map(day => ({ name: day, minutes: 0 }));
    
    sessions.forEach(session => {
      if (session.endTime && session.duration) {
        let dayIndex = new Date(session.endTime).getDay() - 1;
        if (dayIndex === -1) dayIndex = 6; // Dimanche passe de 0 à 6
        dayStats[dayIndex].minutes += session.duration;
      }
    });

    return dayStats.map(stat => ({
      ...stat,
      hours: Math.round(stat.minutes / 60 * 10) / 10
    }));
  }, [sessions]);

  // Statistiques par période de la journée
  const playTimeByPeriod = useMemo(() => {
    const periodStats = PERIODS.map(period => ({ 
      name: period.shortName,
      fullName: period.name,
      minutes: 0,
      start: period.start,
      end: period.end
    }));
    
    sessions.forEach(session => {
      if (session.endTime && session.duration) {
        const hour = new Date(session.endTime).getHours();
        const period = periodStats.find(p => 
          p.end > p.start 
            ? (hour >= p.start && hour < p.end)
            : (hour >= p.start || hour < p.end)
        );
        if (period) {
          period.minutes += session.duration;
        }
      }
    });

    return periodStats.map(stat => ({
      name: stat.name,
      fullName: stat.fullName,
      hours: Math.round(stat.minutes / 60 * 10) / 10
    }));
  }, [sessions]);

  // Statistiques par jeu
  const playTimeByGame = useMemo(() => {
    const gameStats = new Map<number, number>();
    
    sessions.forEach(session => {
      if (session.duration) {
        const current = gameStats.get(session.gameId) || 0;
        gameStats.set(session.gameId, current + session.duration);
      }
    });

    return Array.from(gameStats.entries())
      .map(([gameId, minutes]) => ({
        name: games.find(g => g.id === gameId)?.name || 'Inconnu',
        value: Math.round(minutes / 60 * 10) / 10 // Conversion en heures avec 1 décimale
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 des jeux
  }, [games, sessions]);

  // Statistiques globales
  const globalStats = useMemo(() => {
    const totalMinutes = sessions.reduce((acc, curr) => acc + (curr.duration || 0), 0);
    const totalSessions = sessions.filter(s => s.endTime).length;
    
    return {
      totalHours: Math.round(totalMinutes / 60 * 10) / 10,
      totalSessions,
      averageSessionHours: totalSessions ? Math.round(totalMinutes / totalSessions / 60 * 10) / 10 : 0,
      totalGames: games.length
    };
  }, [games, sessions]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistiques</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={styles.statsGrid}>
          {/* Statistiques globales */}
          <IonCard style={styles.globalStatsCard}>
            <IonCardContent>
              <div style={styles.globalStatsGrid}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{globalStats.totalHours}h</div>
                  <div style={styles.statLabel}>Temps total</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{globalStats.totalSessions}</div>
                  <div style={styles.statLabel}>Sessions</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{globalStats.averageSessionHours}h</div>
                  <div style={styles.statLabel}>Moyenne/session</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>{globalStats.totalGames}</div>
                  <div style={styles.statLabel}>Jeux</div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Graphique par jour */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Temps de jeu par jour</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={playTimeByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="h" />
                    <Tooltip 
                      formatter={(value: number) => [`${value}h`, 'Temps de jeu']}
                    />
                    <Bar dataKey="hours" fill="var(--ion-color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Graphique par période */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Temps de jeu par période</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={playTimeByPeriod}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="h" />
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => {
                        const item = props.payload;
                        return [`${value}h`, item.fullName];
                      }}
                    />
                    <Bar dataKey="hours" fill="var(--ion-color-secondary)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Graphique par jeu */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Top 10 des jeux les plus joués</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={playTimeByGame}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({name, value}) => `${name} (${value}h)`}
                    >
                      {playTimeByGame.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value}h`, 'Temps de jeu']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StatisticsPage; 