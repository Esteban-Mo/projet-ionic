export interface FreeGame {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Origin': window.location.origin,
    'Accept': 'application/json'
  }
};

export const searchGames = async (query: string): Promise<FreeGame[]> => {
  if (!query.trim()) return [];
  
  try {
    // Utilisation de l'API avec proxy local
    const response = await fetch(`/api/games`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const games: FreeGame[] = await response.json();
    
    // Filtrer les jeux qui correspondent à la recherche
    const filteredGames = games.filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.genre.toLowerCase().includes(query.toLowerCase()) ||
      game.short_description?.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredGames.slice(0, 5);
  } catch (error) {
    console.error('Erreur lors de la recherche des jeux:', error);
    return [];
  }
};

export const getGameDetails = async (gameId: number): Promise<FreeGame | null> => {
  try {
    const response = await fetch(`/api/game?id=${gameId}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du jeu:', error);
    return null;
  }
}; 