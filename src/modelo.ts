export interface Personaje {
  id: number;
  nombre: string;
  apodo: string;
  especialidad: string;
  habilidades: string[];
  amigo: string;
  imagen: string;
}

export const API_URL = "http://localhost:3000";

export const CHARACTERS_URL = `${API_URL}/personajes`;
