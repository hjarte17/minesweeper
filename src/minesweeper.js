
// Generate the player's guess board's rows and columns dynamically
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
// Generate the player's guess board's rows and columns dynamically
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
//function to print the number of adjecent Bombs
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[0, 1], [0, -1], [1, 0], [1, 1], [1 , -1], [-1, 0], [-1, 1], [-1, -1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      // Check to see if row and column are valid values on the board
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ){
      // Check if tile is a bomb, if so, increment number of bombs
        if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
          numberOfBombs ++;
        }
      }
    });// Enf of neighborOffsets.forEach
    return numberOfBombs;
}; // End of getNumberOfNeighborBombs
//Function to allow user to flip tiles
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  //check if tile is already flipped, if so, return
  if(playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  }
  //Check if tile is a bomb, if so, place bomb on playerBoard
  else if (bombBoard[rowIndex][columnIndex] === 'B'){
      playerBoard[rowIndex][columnIndex] = 'B';
  }
  //if tile is not a bomb place the number of neighbor bombs
  else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}; //End of flipTile
//Function to printout a board
const printBoard = board => {
  //fills out the layout for evrow element
  console.log(board.map(row => row.join(' | ')).join('\n'));
};
//callsback the functions to print the boards
let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 4);

console.log('Player Board');
printBoard(playerBoard);
console.log('Bombs Board');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 0);
console.log('Updated Player Board');
printBoard(playerBoard);
