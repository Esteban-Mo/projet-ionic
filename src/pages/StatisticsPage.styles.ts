export const styles = {
  statsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '16px',
    maxWidth: '1200px',
    margin: '0 auto',
    animation: 'fadeIn 0.5s ease-out',
    background: 'var(--ion-background-color)'
  },

  globalStatsCard: {
    background: 'linear-gradient(135deg, var(--ion-color-primary) 0%, var(--ion-color-secondary) 100%)',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    animation: 'slideUp 0.5s ease-out',
    border: '1px solid var(--ion-border-color)'
  },

  globalStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '16px',
    padding: '16px',
  },

  statItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
  },

  statValue: {
    fontSize: '1.5em',
    fontWeight: '600',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  },

  statLabel: {
    fontSize: '0.9em',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center' as const,
  },

  chartCard: {
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    animation: 'slideUp 0.5s ease-out',
    background: 'var(--ion-card-background)',
    border: '1px solid var(--ion-border-color)'
  },

  chartHeader: {
    padding: '16px',
    borderBottom: '1px solid var(--ion-border-color)',
    background: 'var(--ion-color-light)'
  },

  chartTitle: {
    fontSize: '1.1em',
    fontWeight: '600',
    color: 'var(--ion-text-color)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  chartIcon: {
    fontSize: '1.2em',
    color: 'var(--ion-color-primary)',
  },

  chartContainer: {
    margin: '8px',
    animation: 'fadeIn 0.5s ease-out',
    padding: '16px',
    background: 'var(--ion-background-color)',
    borderRadius: '8px'
  },
} as const;

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style); 