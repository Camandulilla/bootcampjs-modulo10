import { mostrarPersonajes, nombrePersonajeFiltrado } from "./ui";
import { getPersonajes } from "./motor";

mostrarPersonajes(await getPersonajes());
nombrePersonajeFiltrado();
