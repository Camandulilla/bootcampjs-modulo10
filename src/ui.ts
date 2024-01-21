import { Personaje } from "./modelo";
import { getPersonajes } from "./motor";

export const mostrarPersonajes = async (datos: Personaje[]) => {
  //Obtenemos el contenedor del DOM donde mostrar los personajes
  const contenedorPersonajes = document.getElementById("contenedor-personajes");
  if (contenedorPersonajes && contenedorPersonajes instanceof HTMLElement) {
    contenedorPersonajes.innerHTML = "";
  }
  //Creamos y agregamos elementos HTML para cada personaje
  datos.forEach((personaje: Personaje) => {
    const divPersonaje = document.createElement("div");
    divPersonaje.classList.add("personaje");

    const imagenElement = document.createElement("img");
    imagenElement.src = `http://localhost:3000/${personaje.imagen}`;
    imagenElement.alt = personaje.nombre;

    const nombreElement = document.createElement("p");
    nombreElement.innerHTML = `<strong>Nombre:</strong> ${personaje.nombre}`;

    const especialidadElement = document.createElement("p");
    especialidadElement.innerHTML = `<strong>Especialidad:</strong> ${personaje.especialidad}`;

    const habilidadesElement = document.createElement("p");
    habilidadesElement.innerHTML = `<strong>Habilidades:</strong> ${personaje.habilidades.join(
      ", "
    )}`;

    //Agregamos los elementos al div del personaje
    divPersonaje.appendChild(imagenElement);
    divPersonaje.appendChild(nombreElement);
    divPersonaje.appendChild(especialidadElement);
    divPersonaje.appendChild(habilidadesElement);

    //Agregamos el div del personaje al contenedor principal
    contenedorPersonajes?.appendChild(divPersonaje);
  });
};

export const nombrePersonajeFiltrado = async () => {
  const cajaTexto = document.getElementById("cajaDeTexto");
  const botonFiltrar = document.getElementById("botonFiltrar");
  const contenedorResultado = document.getElementById("contenedor-personajes");

  if (
    botonFiltrar &&
    botonFiltrar instanceof HTMLButtonElement &&
    contenedorResultado
  ) {
    botonFiltrar.addEventListener("click", async () => {
      if (cajaTexto && cajaTexto instanceof HTMLInputElement) {
        const nombreBuscado = cajaTexto.value.trim().toLowerCase();

        if (nombreBuscado) {
          // Limpiar el contenedor antes de mostrar el nuevo personaje
          contenedorResultado.innerHTML = "";

          const personajes = await getPersonajes(nombreBuscado);

          mostrarPersonajes(personajes);
          cajaTexto.value = "";
        } else {
          mostrarPersonajes(await getPersonajes());
        }
      }
    });
  }
};
