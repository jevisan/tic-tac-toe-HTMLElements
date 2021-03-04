class TicTacToeBoard extends HTMLElement {

board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

turn = 1;
currentPlayer = 1;

constructor() {
  super();
  const template = document.getElementById('board-template');
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.appendChild(template.content.cloneNode(true));
  for (let i = 0; i < this.board.length; i++) {
    for (let j = 0; j < this.board[i].length; j++) {
      const newBox = document.createElement('tic-tac-toe-box');
      newBox.addEventListener('click', () => {
        if (this.turn % 2 === 1) {
          newBox.setAttribute('symbol', 'cross');
        } else {
          newBox.setAttribute('symbol', 'circle');
        }
        this.board[i][j] = this.currentPlayer;
        if (checkVictory(this.board, this.currentPlayer)) {
          confirm(`FELICIDADES, HA GANADO EL JUGADOR ${this.currentPlayer}`);
        } else {
          this.turn++;
          this.changePlayer();
        }
      });
      this.shadowRoot.getElementById('board').appendChild(newBox);
    }
  }
}

changePlayer() {
  if (this.currentPlayer == 1) {
    this.currentPlayer = 2
  } else {
    this.currentPlayer = 1;
  }
}
}

class TicTacToeBox extends HTMLElement {

static get observedAttributes() {
  return ['symbol'];
}

constructor() {
  super();
  const template = document.getElementById('box-template');
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.appendChild(template.content.cloneNode(true));
}

attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'symbol' && oldValue === null) {
    const nameSymbol = newValue;
    const symbol = document.createElement(`${newValue}-symbol`);
    this.shadowRoot.getElementById('box').appendChild(symbol);
  }
}
}

class TicTacToeCross extends HTMLElement {
constructor() {
  super();
  const template = document.getElementById('cross-template');
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.appendChild(template.content.cloneNode(true));
}
}

class TicTacToeCircle extends HTMLElement {
constructor() {
  super();
  const template = document.getElementById('circle-template');
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.appendChild(template.content.cloneNode(true));
}
}

window.customElements.define('tic-tac-toe-board', TicTacToeBoard);
window.customElements.define('tic-tac-toe-box', TicTacToeBox);
window.customElements.define('cross-symbol', TicTacToeCross);
window.customElements.define('circle-symbol', TicTacToeCircle);

function checkHorizontal(tablero, jugador) {
  for (row = 0; row < tablero.length; row++) {
    // buscamos en rows
    cont = 0;
    for (col = 0; col < tablero.length; col++) {
      if (tablero[row][col] == jugador) {
        cont++;
      } else {
        break;
      }

      if (cont == tablero.length) {
        return true;
      }
    }
  }
  return false;
}

function checkVertical(tablero, jugador) {
  for (col = 0; col < tablero.length; col++) {
    // buscamos en cols
    cont = 0;
    for (row = 0; row < tablero.length; row++) {
      if (tablero[row][col] == jugador) {
        cont ++;
      } else {
        break;
      }

      if (cont == tablero.length) {
        return true;
      }
    }
  }
  return false;
}

function checkDiagonal(tablero, jugador) {
  cont = 0
  for (row = 0, col = 0; row < tablero.length; row++, col++) {
    if (tablero[row][col] == jugador) {
      cont++;
    } else {
      break;
    }
    if (cont == tablero.length) {
      return true;
    }
  }
  cont = 0;
  for (row = 0, col = tablero.length - 1; row < tablero.length; row++, col--) {
    if (tablero[row][col] == jugador) {
      cont++;
    } else {
      break;
    }
    if (cont == tablero.length) {
      return true;
    }
  }
  return false;
}

function checkVictory(tablero, jugador) {
  return checkHorizontal(tablero, jugador)
      || checkVertical(tablero, jugador)
      || checkDiagonal(tablero, jugador);
}