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

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const API_URL = 'https://www.freetogame.com/api';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const searchGames = async (query: string): Promise<FreeGame[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(`${API_URL}/games`)}`, options);
    
    if (!response.ok) {
      console.error('Erreur API:', response.status, response.statusText);
      throw new Error(`Erreur lors de la recherche des jeux (${response.status})`);
    }
    
    const games: FreeGame[] = await response.json();
    
    if (!Array.isArray(games)) {
      console.error('Format de réponse invalide:', games);
      throw new Error('Format de réponse invalide');
    }
    
    // Filtrer les jeux qui correspondent à la recherche
    const filteredGames = games.filter(game => 
      game.title?.toLowerCase().includes(query.toLowerCase()) ||
      game.genre?.toLowerCase().includes(query.toLowerCase()) ||
      game.short_description?.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredGames.slice(0, 5);
  } catch (error) {
    console.error('Erreur lors de la recherche des jeux:', error);
    throw error;
  }
};

export const getGameDetails = async (gameId: number): Promise<FreeGame | null> => {
  try {
    const response = await fetch(
      `${CORS_PROXY}${encodeURIComponent(`${API_URL}/game?id=${gameId}`)}`,
      options
    );
    
    if (!response.ok) {
      console.error('Erreur API:', response.status, response.statusText);
      throw new Error(`Erreur lors de la récupération des détails du jeu (${response.status})`);
    }
    
    const game = await response.json();
    
    if (!game || typeof game !== 'object') {
      console.error('Format de réponse invalide:', game);
      throw new Error('Format de réponse invalide');
    }
    
    return game;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du jeu:', error);
    throw error;
  }
}; 