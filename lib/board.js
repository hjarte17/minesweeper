'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',

    //Function to allow user to flip tiles
    value: function flipTile(rowIndex, columnIndex) {
      //check if tile is already flipped, if so, return
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      }
      //Check if tile is a bomb, if so, place bomb on playerBoard
      if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      }
      //if tile is not a bomb place the number of neighbor bombs
      else {
          this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    //End of flipTile
    //function to print the number of adjecent Bombs
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[0, 1], [0, -1], [1, 0], [1, 1], [1, -1], [-1, 0], [-1, 1], [-1, -1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        // Check to see if row and column are valid values on the board
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          // Check if tile is a bomb, if so, increment number of bombs
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      }); // Enf of neighborOffsets.forEach
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    // End of getNumberOfNeighborBombs
    // method to check there are no safe tiles to flipped
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    } // end of hasSafeTiles

    //Function to printout a board

  }, {
    key: 'print',
    value: function print(board) {
      //fills out the layout for evrow element
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n')); //chech this one
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    // end of print method

    /*
    print() {
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }
    */
    // Generate the player's guess board's rows and columns dynamically
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      // iterate to ganerate the rows and columns
      for (var rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(' ');
        }
        //End of inner for loop
        board.push(row);
      }
      //End of outer for loop
      return board;
    }
  }, {
    key: 'generateBombBoard',

    //console.log(generatePlayerBoard(6, 6));
    // End of generatePlayerBoard
    // Generate the player's guess board's rows and columns dynamically
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      // iterate to ganerate the rows and columns
      for (var rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++) {
        var row = [];
        for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          row.push(null);
        }
        //End of inner for loop
        board.push(row);
      }
      //End of outer for loop
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        //An important note: The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      //End of Bombs loop
      return board;
    }
  }]);

  return Board;
}();