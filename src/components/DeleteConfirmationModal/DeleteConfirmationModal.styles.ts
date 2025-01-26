import { commonStyles } from '../../styles/common.styles';

export const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  content: {
    textAlign: 'center'
  },
  title: commonStyles.title,
  description: {
    color: 'var(--ion-color-medium)',
    fontSize: '0.9em',
    margin: 0
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  }
} as const; 