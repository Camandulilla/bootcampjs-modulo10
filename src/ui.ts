import { Personaje } from "./modelo";
import { getPersonajes } from "./motor";
import { API_URL } from "./modelo";

const crearListadoTarjetas = (datos: Personaje[]) => {
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
    imagenElement.src = API_URL + `/${personaje.imagen}`;
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

export const gridPersonajes = async () => {
  const datos = await getPersonajes();
  crearListadoTarjetas(datos);
};

//EVENTO CUANDO EL USUARIO HACE CLICK EN EL BOTÓN
const cajaTexto = document.getElementById("cajaDeTexto");
const botonFiltrar = document.getElementById("botonFiltrar");

if (botonFiltrar && botonFiltrar instanceof HTMLButtonElement) {
  botonFiltrar.addEventListener("click", async () => {
    if (cajaTexto && cajaTexto instanceof HTMLInputElement) {
      const nombreBuscado = cajaTexto.value.trim().toLowerCase();

      if (nombreBuscado) {
        const datos = await getPersonajes(nombreBuscado);

        crearListadoTarjetas(datos);
        cajaTexto.value = "";
      } else {
        gridPersonajes();
      }
    }
  });
}
