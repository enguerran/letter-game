"use strict";

export function getBonus(x, y) {
  if(x % 4 === 1 && y % 4 === 1) {
    if((x-1)%12 !== 0 || (y-1)%12 !== 0) {
      return "TLS";
    }
  }
  if(x%7 === 0 && y%7 === 0 && (x !== 7 || y !== 7)) {
      return "TWS";
  }
  if(x < 5 || x > 9 || x === 7) {
    if(x === y || x === 14 - y) {
      return "DWS";
    }
  }
  if(x%14 !== 0) {
    if(!(x === 10 || x === 4) && x%2 === 0) {
      if(y === 14/2 + 1 || y === 14/2 - 1) {
        return "DLS";
      }
    }
  }
  if(x%8 === 3) {
    if(y%7 === 0) {
      return "DLS";
    }
  }
  if(y%14 !== 0) {
    if(!(y === 10 || y === 4) && y%2 === 0) {
      if(x === 14/2 + 1 || x === 14/2 - 1) {
        return "DLS";
      }
    }
  }
  if(y%8 === 3) {
    if(x%7 === 0) {
      return "DLS";
    }
  }
  return undefined;
}


function getLetterScore(letter) {
  switch(letter) {
    case "K":
    case "W":
    case "X":
    case "Y":
    case "Z":
      return 10;
    case "J":
    case "Q":
      return 8;
    case "F":
    case "H":
    case "V":
      return 4;
    case "B":
    case "C":
    case "P":
      return 3;
    case "D":
    case "G":
    case "M":
      return 2;
    default:
      return 1;
  }
}


export var Game = function() {
  var board = {
    _cells: [],
    _bonus: [],
    _currentScore: 0,
    _activeBonus: 1,
    getCellState: function(x, y) {
      return this._cells[x+"-"+y] || "empty";
    },
    getCellBonus: function(x, y) {
      return getBonus(x, y);
    },
    getCellScore: function(x, y) {
      var letter = this.getCellState(x, y);
      if(letter === "empty") {
        return 0;
      }
      var bonus = 1;
      if(this.getCellBonus(x, y) === "DLS") {
        bonus = 2;
      }
      if(this.getCellBonus(x, y) === "TLS") {
        bonus = 3;
      }
      return bonus * getLetterScore(letter);
    },
    getWordScore: function() {
      return this._currentScore * this._activeBonus;
    },
    addLetter: function(letter, x, y) {
      this._cells[x+"-"+y] = letter;
      var bonus = 1;
      switch(this.getCellBonus(x, y)) {
        case "TWS":
          bonus = 3;
          break;
        case "DWS":
          bonus = 2;
          break;
        default:
          break;
      }
      this._activeBonus = this._activeBonus * bonus;
      this._currentScore = this._currentScore + this.getCellScore(x, y);
    },
    endTurn: function() {
      this._currentScore = 0;
      return true;
    }
  };

  function newBoard() {
    return board;
  }

  return {
    createBoard: newBoard
  };
};
