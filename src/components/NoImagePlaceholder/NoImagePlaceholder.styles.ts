export const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--ion-color-primary) 0%, var(--ion-color-secondary) 100%)',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  },
  icon: {
    fontSize: '3em',
    marginBottom: '10px',
    opacity: '0.8'
  },
  text: {
    fontSize: '0.9em',
    wordBreak: 'break-word',
    opacity: '0.9',
    fontWeight: '500'
  }
} as const; 