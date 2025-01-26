export const styles = {
  searchbar: {
    '--background': 'var(--ion-background-color)'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px'
  },
  error: {
    color: 'var(--ion-color-danger)',
    padding: '10px',
    textAlign: 'center'
  },
  thumbnail: {
    width: '80px',
    height: '80px'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  gameTitle: {
    margin: '0 0 4px 0',
    fontSize: '1.1em',
    fontWeight: '500'
  },
  gameInfo: {
    fontSize: '0.9em',
    color: 'var(--ion-color-medium)',
    margin: '4px 0'
  },
  description: {
    fontSize: '0.8em',
    color: 'var(--ion-color-medium)'
  },
  publisher: {
    fontSize: '0.8em'
  },
  addButton: {
    margin: '10px'
  },
  existingGame: {
    opacity: 0.7,
    backgroundColor: 'var(--ion-color-light)',
    cursor: 'default'
  },
  existingGameNote: {
    display: 'block',
    marginTop: '8px',
    fontStyle: 'italic'
  }
} as const; 