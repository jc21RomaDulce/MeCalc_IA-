// hooks
import { useState } from "react";
import { useEffect } from "react";

// scripts
import {
  sumar,
  restar,
  multiplicar,
  dividir,
  random,
} from "../scripts/operaciones.js";

// componentes
import confetti from "canvas-confetti";

export default function Calculadora() {
  const [numeroActual, setNumeroActual] = useState("");
  const [resultado, setResultado] = useState(0);
  const [operacionActual, setOperacionActual] = useState(null);

  // algo creativo
  useEffect(() => {
    if (resultado === 2021) {
      confetti();
    }
  }, [resultado]);

//   useEffect(() => {
//     if (resultado !== 0) {
//       const pantalla = document.querySelector(".pantalla");
//       pantalla.style.backgroundColor = "red"; // Cambiar a un color claro
//       setTimeout(() => {
//         pantalla.style.backgroundColor = ""; // Restaurar el color original
//       }, 500);
//     }
//   }, [resultado]);


  // accesibilidad → teclado
  useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event; // Obtener la tecla presionada mediante destructuración

      if (!isNaN(key)) {
        // Si es un número
        setNumeroActual((prev) => prev + key);
      } else if (key === ".") {
        setNumeroActual((prev) => (prev.includes(".") ? prev : prev + "."));
      } else if (["+", "-", "*", "/"].includes(key)) {
        setOperacionActual(key === "*" ? "x" : key); // si se presiona "*", se usa "x"

        if (numeroActual !== "") {
          const numero = parseFloat(numeroActual) || 0;
          setResultado((prev) =>
            operacionActual
              ? calcularResultado(prev, numero, operacionActual)
              : numero
          );
          setNumeroActual("");
        }
      } else if (key === "Enter") {
        if (operacionActual && numeroActual !== "") {
          const numero = parseFloat(numeroActual);
          setResultado((prev) =>
            calcularResultado(prev, numero, operacionActual)
          );
          setNumeroActual("");
          setOperacionActual(null);
        }
      } else if (key === "Backspace") {
        setNumeroActual((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        setNumeroActual("");
        setResultado(0);
        setOperacionActual(null);
      } else if (key === "r") {
        setNumeroActual(String(random()));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [numeroActual, operacionActual, resultado]);


  // IMPLEMENTACION DE LA LOGICA DE LA CALCULADORA
  function calcularResultado(prevResultado, numero, operacion) {
    switch (operacion) {
      case "+":
        return sumar(prevResultado, numero);
      case "-":
        return restar(prevResultado, numero);
      case "x":
        return multiplicar(prevResultado, numero);
      case "/":
        return dividir(prevResultado, numero);
      default:
        return prevResultado;
    }
  }

  // HANDLERS
  // CLICK EN NÚMEROS
  function handleClickNumero(numero) {
    setNumeroActual((prev) => prev + String(numero));
  }

  // CLICK EN OPERACIONES
  function handleOperacion(event) {
    event.preventDefault();
    const operacion = event.target.innerText;

    if (operacion === "=") {
      setOperacionActual(null); // Finalizar operación
    } else {
      setOperacionActual(operacion); // Guardar la operación seleccionada
    }

    if (numeroActual !== "") {
      const numero = parseFloat(numeroActual) || 0;

      if (operacionActual) {
        // Realizar la operación acumulada
        const nuevoResultado = calcularResultado(
          resultado,
          numero,
          operacionActual
        );
        setResultado(nuevoResultado);
      } else {
        // Si no hay operación previa, usar el número actual como resultado inicial
        setResultado(numero);
      }

      setNumeroActual(""); // Reiniciar el número actual
    }
  }

  // BORRAR ÚLTIMO NÚMERO
  function handleBorrarUltimo() {
    setNumeroActual((prev) => prev.slice(0, -1));
  }

  // BORRAR TODO
  function handleBorrarTodo() {
    setNumeroActual("");
    setResultado(0);
    setOperacionActual(null);
  }

  // BOTÓN RANDOM
  function handleRandom() {
    const numero = random();
    setNumeroActual(numero.toString());
  }

  return (
    <>
      <section className="calculadora">
        <section className="pantalla"> {numeroActual || resultado} </section>

        <section className="botones">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              className={`btn btn-num`}
              onClick={() => handleClickNumero(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="btn btn-punto"
            onClick={() => handleClickNumero(".")}
          >
            .
          </button>
          <button className="btn btn-random" onClick={handleRandom}>
            Rndm
          </button>
          <button
            className="btn btn-sumar"
            onClick={(event) => handleOperacion(event)}
          >
            +
          </button>
          <button
            className="btn btn-restar"
            onClick={(event) => handleOperacion(event)}
          >
            -
          </button>
          <button
            className="btn btn-multiplicar"
            onClick={(event) => handleOperacion(event)}
          >
            x
          </button>
          <button
            className="btn btn-dividir"
            onClick={(event) => handleOperacion(event)}
          >
            /
          </button>
          <button
            className="btn btn-evaluar"
            onClick={(event) => handleOperacion(event)}
          >
            =
          </button>
          <button className="btn btn-borrar" onClick={handleBorrarUltimo}>
            Borrar
          </button>
          <button
            className="btn btn-borrar-todo"
            onClick={() => handleBorrarTodo()}
          >
            Borrar todo
          </button>
        </section>
      </section>
    </>
  );
}