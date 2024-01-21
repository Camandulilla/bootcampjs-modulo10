export interface Personaje {
  id: number;
  nombre: string;
  apodo: string;
  especialidad: string;
  habilidades: string[];
  amigo: string;
  imagen: string;
}

export const ENDPOINT_PERSONAJES = "http://localhost:3000/personajes";
