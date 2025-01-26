export const styles = {
  toolbar: {
    '--padding-top': '8px',
    '--padding-bottom': '8px'
  },
  title: {
    fontSize: '1.4em',
    fontWeight: '600'
  },
  addButton: {
    fontSize: '1.4em'
  },
  gamesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '8px',
    padding: '8px'
  },
  fab: {
    margin: '16px',
    '--border-radius': '16px'
  }
} as const; 