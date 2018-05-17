
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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
}
  //End of Bombs loop
  return board;
};
//Function to printout a board
const printBoard = board => {
  //fills out the layout for evrow element
  console.log(board.map(row => row.join(' ~ ')).join('\n'));
};
//callsback the functions to print the boards
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board');
printBoard(playerBoard);
console.log('Bombs Board');
printBoard(bombBoard);
