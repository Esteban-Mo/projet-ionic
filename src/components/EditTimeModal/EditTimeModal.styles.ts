import { commonStyles } from '../../styles/common.styles';

export const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    backgroundColor: 'var(--ion-background-color)'
  },
  title: commonStyles.title,
  inputContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    width: '80px',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid var(--ion-color-medium)',
    textAlign: 'center',
    fontSize: '1.1em'
  },
  inputLabel: {
    fontSize: '0.8em',
    color: 'var(--ion-color-medium)',
    marginTop: '4px'
  },
  separator: {
    fontSize: '1.2em',
    fontWeight: '600',
    margin: '0 10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  }
} as const; 