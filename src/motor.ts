import axios from "axios";
import { Personaje } from "./modelo";
import { ENDPOINT_PERSONAJES } from "./modelo";

export const getPersonajes = async (nombre?: string) => {
  try {
    if (nombre) {
      const response = await axios.get(
        `http://localhost:3000/personajes?nombre_like=${nombre}`
      );
      const personajes: Personaje[] = response.data;
      return personajes;
    }
    const response = await axios.get(ENDPOINT_PERSONAJES);
    const personajes: Personaje[] = response.data;
    return personajes;
  } catch (error) {
    console.error("Error al cargar personajes", error);
    return [];
  }
};
