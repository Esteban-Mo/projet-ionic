export interface Plant {
  id: number;
  name: string;
  species: string;
  lastWatered: Date;
  wateringFrequency: number;
  health: number;
  image?: string;
} 