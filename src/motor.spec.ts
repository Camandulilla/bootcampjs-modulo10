import { vi } from "vitest";
import Axios from "axios";
import { Personaje } from "./modelo";
import { getPersonajes } from "./motor";

describe("getPersonajes", (nombre?: string) => {
  it("Comprobamos que leemos bien los personajes de la API", async () => {
    //Arrange
    const personajesMock: Personaje[] = [
      {
        id: 1,
        nombre: "Mortadelo",
        apodo: "Mortadelo",
        especialidad: "Disfraces",
        habilidades: ["Camuflaje", "Imitaciones", "Huida rápida"],
        amigo: "Filemón",
        imagen: "mortadelo.webp",
      },
    ];

    vi.spyOn(Axios, "get").mockResolvedValue({
      data: personajesMock,
    });

    //Act
    const resultado = await getPersonajes();

    //Assert
    expect(resultado).toEqual(personajesMock);
  });

  it("Comprueba el caso de endpoint no encontrado (Error 404)", async () => {
    // Arrange
    vi.spyOn(Axios, "get").mockRejectedValue({
      response: {
        status: 404,
        data: "Endpoint no encontrado",
      },
    });

    // Act
    const resultado = await getPersonajes();

    // Assert
    expect(resultado).toEqual([]);
  });

  it("Comprueba el caso de filtrar el nombre del personaje buscado y que se encuentre", async () => {
    //Assert
    const personajesMock: Personaje[] = [
      {
        id: 1,
        nombre: "Mortadelo",
        apodo: "Mortadelo",
        especialidad: "Disfraces",
        habilidades: ["Camuflaje", "Imitaciones", "Huida rápida"],
        amigo: "Filemón",
        imagen: "mortadelo.webp",
      },
    ];

    vi.spyOn(Axios, "get").mockResolvedValue({
      data: personajesMock,
    });

    //Act
    const resultado = await getPersonajes("Mortadelo");

    //Assert
    expect(resultado).toEqual(personajesMock);
  });

  it("Comprueba el caso de filtrar el nombre del personaje buscado y que no se encuentre", async () => {
    //Assert

    vi.spyOn(Axios, "get").mockRejectedValue({
      response: {
        status: 404,
        data: "Personaje no encontrado",
      },
    });

    //Act
    nombre = "Jonathan";
    const resultado = await getPersonajes(nombre);

    //Assert
    expect(resultado).toEqual([]);
  });
});
