import axios from "axios";
import { Personaje } from "./modelo";
import { CHARACTERS_URL } from "./modelo";

export const getPersonajes = async (nombre?: string) => {
  try {
    if (nombre) {
      const response = await axios.get(
        CHARACTERS_URL + `?nombre_like=${nombre}`
      );
      const personajes: Personaje[] = response.data;
      return personajes;
    }
    const response = await axios.get(CHARACTERS_URL);
    const personajes: Personaje[] = response.data;
    return personajes;
  } catch (error) {
    console.error("Error al cargar personajes", error);
    return [];
  }
};
