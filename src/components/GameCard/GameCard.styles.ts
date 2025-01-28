export const styles = {
  card: {
    margin: '16px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid var(--ion-border-color)',
    background: 'var(--ion-background-color)'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--ion-background-color)',
    height: '100%'
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '56.25%', // Ratio 16:9
    overflow: 'hidden',
    backgroundColor: 'var(--ion-color-light)',
    cursor: 'pointer'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    ':hover': {
      opacity: 1
    }
  },
  cameraIcon: {
    fontSize: '2em',
    color: 'white'
  },
  content: {
    padding: '20px'
  },
  header: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '1.4em',
    fontWeight: '600',
    color: 'var(--ion-text-color)'
  },
  genre: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    backgroundColor: 'var(--ion-color-primary)',
    color: 'white',
    fontSize: '0.8em',
    fontWeight: '500'
  },
  actionButtons: {
    display: 'flex',
    gap: '4px'
  },
  iconButton: {
    margin: '-10px -10px 0 0',
    '--padding-start': '8px',
    '--padding-end': '8px',
    '--color': 'var(--ion-text-color)'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '20px'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    fontSize: '1.2em',
    fontWeight: '600',
    color: 'var(--ion-text-color)'
  },
  statLabel: {
    fontSize: '0.8em',
    color: 'var(--ion-color-medium)',
    marginTop: '4px'
  },
  editableTime: {
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: 'var(--ion-color-light)'
    }
  },
  detailsBox: {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'var(--ion-color-light)',
    fontSize: '0.9em',
    border: '1px solid var(--ion-border-color)',
    color: 'var(--ion-text-color)'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    color: 'var(--ion-text-color)'
  },
  activeSession: {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: 'var(--ion-color-warning)',
    color: 'var(--ion-color-warning-contrast)',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '1.1em'
  },
  badge: (color: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: `${color}15`,
    color: color,
    border: `1px solid ${color}30`
  })
} as const; 