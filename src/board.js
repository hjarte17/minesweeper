export class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }
  //Function to allow user to flip tiles
  flipTile  (rowIndex, columnIndex)  {
      //check if tile is already flipped, if so, return
      if(this._playerBoard[rowIndex][columnIndex] !== ' '){
        console.log('This tile has already been flipped!');
        return;
      }
      //Check if tile is a bomb, if so, place bomb on playerBoard
      if (this._bombBoard[rowIndex][columnIndex] === 'B'){
          this._playerBoard[rowIndex][columnIndex] = 'B';
      }
      //if tile is not a bomb place the number of neighbor bombs
      else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }; //End of flipTile
    //function to print the number of adjecent Bombs
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
      const neighborOffsets = [[0, 1], [0, -1], [1, 0], [1, 1], [1 , -1], [-1, 0], [-1, 1], [-1, -1]];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
        neighborOffsets.forEach(offset => {
          const neighborRowIndex = rowIndex + offset[0];
          const neighborColumnIndex = columnIndex + offset[1];
          // Check to see if row and column are valid values on the board
          if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ){
          // Check if tile is a bomb, if so, increment number of bombs
            if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
              numberOfBombs ++;
            }
          }
        });// Enf of neighborOffsets.forEach
        return numberOfBombs;
    }; // End of getNumberOfNeighborBombs
    // method to check there are no safe tiles to flipped
    hasSafeTiles(){
        return this._numberOfTiles !== this._numberOfBombs;
    } // end of hasSafeTiles

    //Function to printout a board

    print(board) {
      //fills out the layout for evrow element
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n')); //chech this one
    }; // end of print method

    /*
    print() {
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }
    */
    // Generate the player's guess board's rows and columns dynamically
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
      let board = [];
      // iterate to ganerate the rows and columns
      for (let rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++){
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
          row.push(' ');
        }
        //End of inner for loop
        board.push(row);
      }
      //End of outer for loop
      return board;
    };
    //console.log(generatePlayerBoard(6, 6));
    // End of generatePlayerBoard
    // Generate the player's guess board's rows and columns dynamically
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      let board = [];
      // iterate to ganerate the rows and columns
      for (let rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++){
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
          row.push(null);
        }
        //End of inner for loop
        board.push(row);
      }
      //End of outer for loop
      let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        //An important note: The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
      //End of Bombs loop
      return board;
    };//end of generateBombBoard function
}  //End of Board class
