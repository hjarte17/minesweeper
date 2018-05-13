// Run node minesweeper.js to run this code.
// Hardcode 3 blank columns to represent empty lots
const blankLine = '  |   |  ';
console.log("This is what an empty board would look like:");
// Log the blankLine in 3 rows
console.log(`${blankLine} \n${blankLine} \n${blankLine}`);


// Hardcode a guessline
const guessLine = '1 |   |  ';
// harcode a bombline
const bombLine = '  | B |  ';
// Print what a board might look like during a game.
console.log("This is what a board with a guess and a bomb on it would look like:");
// Print a guessLine, a bombLine and a blankLine.
console.log(`${guessLine} \n${bombLine} \n${blankLine}`);
