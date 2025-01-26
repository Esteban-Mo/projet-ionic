export const styles = {
  statsGrid: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  globalStatsCard: {
    margin: 0
  },
  globalStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '8px'
  },
  statItem: {
    textAlign: 'center',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'var(--ion-color-light)'
  },
  statValue: {
    fontSize: '1.4em',
    fontWeight: '600',
    color: 'var(--ion-color-primary)',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '0.9em',
    color: 'var(--ion-color-medium)'
  },
  chartContainer: {
    marginTop: '16px',
    height: '300px'
  }
} as const; 