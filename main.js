const html = String.raw;

class TicTacToeBoard extends HTMLElement {

  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  turn = 1;
  currentPlayer = 1;
  plays = {1: 0, 2: 0};

  TEMPLATE = html`
    <style>
        #board {
          width: 540px;
          height: 540px;
          padding: 20px;
          background: rgb(229, 214, 194);
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          justify-content: space-between;
        }
      </style>
      <div id="board"></div>
  `

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.initGame();
  }

  changePlayer() {
    if (this.currentPlayer == 1) {
      this.currentPlayer = 2
    } else {
      this.currentPlayer = 1;
    }
  }

  initGame() {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  
    this.turn = 1;
    this.currentPlayer = 1;
    this.shadowRoot.innerHTML = this.TEMPLATE;
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
          this.plays[this.currentPlayer]++;
          if (checkVictory(this.board, this.currentPlayer)) {
            setTimeout(() => {
              confirm(`FELICIDADES, HA GANADO EL JUGADOR ${this.currentPlayer} en ${this.plays[this.currentPlayer]} movimientos`);
              this.initGame();
            }, 100);
          } else {
            this.turn++;
            this.changePlayer();
          }
        });
        this.shadowRoot.getElementById('board').appendChild(newBox);
      }
    }
  }

  reset() {
    
  }
}

class TicTacToeBox extends HTMLElement {

  TEMPLATE = html`
    <style>
      #box {
        width: 175px;
        height: 175px;
        background: rgb(254, 254, 240);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
    <div id="box"></div>
  `

  static get observedAttributes() {
    return ['symbol'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.TEMPLATE;
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

  TEMPLATE = html`
    <style>
      :host {
        background:  rgb(71, 69, 78);
        height: 100px;
        position: relative;
        width: 10px;
        transform: rotate(45deg);
        border-radius: 30px;
      }
      
      :host:after {
        background:  rgb(71, 69, 78);
        content: "";
        height: 10px;
        left: -45px;
        position: absolute;
        top: 45px;
        width: 100px;
        border-radius: 30px;
      }
    </style>
  `
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.TEMPLATE;
  }
}

class TicTacToeCircle extends HTMLElement {
  TEMPLATE = html`
    <style>
      :host {
        background: transparent;
        border: 10px solid rgb(184, 64, 57);
        width: 75px;
        height: 70px;
        border-radius: 50%;
      }
    </style>
  `
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.TEMPLATE;
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