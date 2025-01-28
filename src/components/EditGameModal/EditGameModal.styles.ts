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
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  errorText: {
    fontSize: '0.8em',
    marginTop: '4px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  }
} as const; 