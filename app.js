const contenedorOpciones = document.getElementById("contenedorOpciones");
const piedra = document.getElementById("piedra");
const papel = document.getElementById("papel");
const tijera = document.getElementById("tijera");
const mensaje = document.getElementById("mensaje");
const spanUser = document.getElementById("spanUser");
const spanBot = document.getElementById("spanBot");
const btnResetPuntos = document.getElementById("btnResetPuntos");

let puntosUser = JSON.parse(localStorage.getItem("puntosUser")) || 0;
let puntosBot = JSON.parse(localStorage.getItem("puntosBot")) || 0;

spanUser.innerText = puntosUser;
spanBot.innerText = puntosBot;

const opciones = ["piedra", "papel", "tijera"];

const play = (valorUser) => {
  const numeroRobot = Math.floor(Math.random() * (2 - 0 + 1) + 0);
  contenedorOpciones.innerHTML =
    /* HTML */
    `
      <div class="col">
        <img
          src="./img/rockIzq.png"
          alt="mano en forma de piedra"
          class="img-fluid mx-auto d-block opciones floating"
        />
      </div>
      <div class="col">
        <img
          src="./img/piedra.svg"
          alt="mano en forma de piedra"
          class="img-fluid mx-auto d-block opciones floating"
        />
      </div>
    `;
  mensaje.innerText = "El robot esta eligiendo...";

  setTimeout(() => {
    contenedorOpciones.innerHTML =
      /* HTML */
      `<div class="col">
          <img
            src="./img/${valorUser}.svg"
            alt="mano en forma de piedra"
            class="img-fluid mx-auto d-block opciones opcionIzq"
          />
        </div>
        <div class="col">
          <img
            src="./img/${opciones[numeroRobot]}.svg"
            alt="mano en forma de piedra"
            class="img-fluid mx-auto d-block opciones"
          />
        </div> `;
    evaluarResultado(valorUser, opciones[numeroRobot]);
  }, 2500);
};

const evaluarResultado = (valorUser, valorBot) => {
  if (valorUser === valorBot) {
    mensaje.innerText = "Es un empate 🤝";
  } else if (
    (valorUser === "piedra" && valorBot === "tijera") ||
    (valorUser === "papel" && valorBot === "piedra") ||
    (valorUser === "tijera" && valorBot === "papel")
  ) {
    mensaje.innerText = "El ganador es el Usuario! 🤩🎉";
    puntosUser += 1;
    spanUser.innerText = puntosUser;
    localStorage.setItem("puntosUser", JSON.stringify(puntosUser));
  } else {
    mensaje.innerText = "El ganador es el Robot! 🤖🤘";
    puntosBot += 1;
    spanBot.innerText = puntosBot;
    localStorage.setItem("puntosBot", JSON.stringify(puntosBot));
  }

  setTimeout(() => {
    location.reload();
  }, 2000);
};

const resetPuntos = () => {
  puntosUser = 0;
  spanUser.innerText = puntosUser;
  puntosBot = 0;
  spanBot.innerText = puntosBot;
  localStorage.clear("puntosUser");
  localStorage.clear("puntosBot");
};

piedra.addEventListener("click", (e) => {
  play(e.target.id);
});
papel.addEventListener("click", (e) => {
  play(e.target.id);
});
tijera.addEventListener("click", (e) => {
  play(e.target.id);
});

btnResetPuntos.addEventListener("click", () => {
  resetPuntos();
});
