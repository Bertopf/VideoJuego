class Game {
  constructor() {
    this.container = document.getElementById("game-container");
    this.personaje = null;
    this.monedas = [];
    this.puntuacion = 0;
    this.crearEscenario();
    this.agregarEventos();
    this.puntosElement = document.getElementById("puntos");
    this.tiempoRestante = 30; // 30 segundos
    this.temporizadorInterval = null;
    this.juegoTerminado = false;
    this.puntosElement = document.getElementById("puntos");
    this.tiempoElement = document.getElementById("tiempo");
    this.gameOverElement = document.getElementById("game-over");
    this.iniciarTemporizador();

  }

  iniciarTemporizador() {
    this.temporizadorInterval = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
        this.tiempoElement.textContent = `Tiempo: ${this.tiempoRestante}`;
      } else {
        this.finalizarJuego();
      }
    }, 1000);
  }

   finalizarJuego() {
    clearInterval(this.temporizadorInterval);
    this.juegoTerminado = true;
    this.tiempoElement.textContent = "Tiempo: 0";
    this.gameOverElement.style.display = "block";
    window.removeEventListener("keydown", this.controladorTeclas); // opcional
  }

  crearEscenario() {
    this.personaje = new Personaje();
    this.container.appendChild(this.personaje.element);

    for (let i = 0; i < 5; i++) {
      const moneda = new Moneda();
      this.monedas.push(moneda);
      this.container.appendChild(moneda.element);
      this.container.appendChild(moneda.vidaBar);
    }
  }

  agregarEventos() {
    window.addEventListener("keydown", (e) => this.personaje.mover(e));
    this.checkColisiones();
  }
  

  checkColisiones() {
    setInterval(() => {
      this.monedas = this.monedas.filter((moneda) => {
        if (this.personaje.colisionaCon(moneda)) {
          moneda.recibirDaño(2); // Resta 1 punto de vida
          if (moneda.vida <= 0) {
            this.container.removeChild(moneda.element);
            this.container.removeChild(moneda.vidaBar);
            this.actualizarPuntuacion(10);
            return false; // eliminar del array
          }
        }
        return true;
      });
    }, 25);
  }

  actualizarPuntuacion(puntos) {
    this.puntuacion += puntos;
    this.puntosElement.textContent = `Puntos: ${this.puntuacion}`;
  }
}

class Personaje {
  constructor() {
    this.x = 400;
    this.y = 800;
    this.posicionInicialY = this.y;
    this.width = 50;
    this.height = 50;
    this.velocidad = 40;
    this.saltando = false;
    this.element = document.createElement("div");
    this.element.classList.add("personaje");
    this.actualizarPosicion();
  }

  mover(evento) {
    if (evento.key === "ArrowRight" && this.x + this.width < 1000) {
      this.x += this.velocidad;
    } else if (evento.key === "ArrowLeft" && this.x > 0) {
      this.x -= this.velocidad;
    } else if (evento.key === "ArrowUp" && !this.saltando) {
      this.saltar();
    }
    this.actualizarPosicion();
  }

  saltar() {
    this.saltando = true;
    const alturaMaxima = this.y - 1100;
    const salto = setInterval(() => {
      if (this.y > alturaMaxima) {
        this.y -= 100;
      } else {
        clearInterval(salto);
        this.caer();
      }
      this.actualizarPosicion();
    }, 20);
  }

  caer() {
    const gravedad = setInterval(() => {
      if (this.y < this.posicionInicialY) {
        this.y += 1000;
      } else {
        this.y = this.posicionInicialY;
        clearInterval(gravedad);
        this.saltando = false;
      }
      this.actualizarPosicion();
    }, 20);
  }

  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  colisionaCon(objeto) {
    return (
      this.x < objeto.x + objeto.width &&
      this.x + this.width > objeto.x &&
      this.y < objeto.y + objeto.height &&
      this.y + this.height > objeto.y
    );
  }
}

class Moneda {
  constructor() {
    this.x = Math.random() * 900 + 30;
    this.y = Math.random() * 300 + 30;
    this.width = 30;
    this.height = 30;
    this.vida = 3;
    this.element = document.createElement("div");
    this.vidaBar = document.createElement("div");
    this.element.classList.add("moneda");
    this.vidaBar.classList.add("vida-bar");
    this.actualizarPosicion();
    this.actualizarVida();
  }

  actualizarPosicion() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.vidaBar.style.left = `${this.x}px`;
    this.vidaBar.style.top = `${this.y - 10}px`;
  }

  recibirDaño(dano) {
    this.vida -= dano;
    this.actualizarVida();
  }

  actualizarVida() {
    this.vidaBar.style.width = `${(this.vida / 3) * 30}px`;
    this.vidaBar.style.backgroundColor = this.vida === 1 ? "red" : this.vida === 2 ? "orange" : "green";
  }
}


 class Nave {
  constructor() {
    this.x = 400;
    this.y = 800;
    this.posicionInicialY = this.y;
    this.width = 50;
    this.height = 50;
    this.velocidad = 100;
    this.saltando = false;
    this.element = document.createElement("div");
    this.element.classList.add("personaje");
    this.actualizarPosicion();
  }

  mover(evento) {
    if (evento.key === "ArrowRight" && this.x + this.width < 1000) {
      this.x += this.velocidad;
    } else if (evento.key === "ArrowLeft" && this.x > 0) {
      this.x -= this.velocidad;
    }

}
 }

const musicaFondo = document.getElementById("musica-fondo");

window.addEventListener("keydown", () => {
  musicaFondo.volume = 0.5;
  musicaFondo.play();
}, { once: true });



    


const juego = new Game();