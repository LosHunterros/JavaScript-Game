const board = document.getElementById("board");
const puzzles = document.querySelectorAll(".puzzle");
const gameState = [
  [puzzles[0], puzzles[1], puzzles[2]],
  [puzzles[3], puzzles[4], puzzles[5]],
  [puzzles[6], puzzles[7], puzzles[8]],
];

// return clicked puzzle position in gameState
function getPuzzlePositionOnBoard(target) {
  let x, y;
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column === target) {
        x = rowIndex;
        y = columnIndex;
      }
    });
  });
  return [x, y];
}

// return empty puzzle in gameState
function getEmptyPosition() {
  let emptyX, emptyY;
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column.innerText === "") {
        emptyX = rowIndex;
        emptyY = columnIndex;
      }
    });
  });
  return [emptyX, emptyY];
}

// check if puzzle can move
function checkIfValidMove(x, y, emptyX, emptyY) {
  return (
    (emptyX === x + 1 && emptyY === y) || // down
    (emptyX === x - 1 && emptyY === y) || //  up
    (emptyX === x && emptyY === y + 1) || // right
    (emptyX === x && emptyY === y - 1) // left
  );
}

// move puzzle if valid move
function movePuzzle(event) {
  let puzzle = event.target;
  let number = puzzle.innerText;
  let [x, y] = getPuzzlePositionOnBoard(event.target);
  let [emptyX, emptyY] = getEmptyPosition();
  if (checkIfValidMove(x, y, emptyX, emptyY)) {
    gameState[x][y].innerText = "";
    gameState[emptyX][emptyY].innerText = number;
    console.log("Puzzle moved");
  }
}

// listiners for checking if functions work
function puzzleClickListener(event) {
  let puzzle = event.target;
  let number = puzzle.innerText;
  console.log(`Clicked: ${number}`);
}

function puzzlePositionListener(event) {
  let [x, y] = getPuzzlePositionOnBoard(event.target);
  console.log(`Row: ${x}, Column: ${y}`);
}

function emptyPositionListener(event) {
  let [emptyX, emptyY] = getEmptyPosition(event.target);
  console.log(`Row: ${emptyX}, Column: ${emptyY}`);
}

function validMoveListener(event) {
  let [x, y] = getPuzzlePositionOnBoard(event.target);
  let [emptyX, emptyY] = getEmptyPosition();
  if (checkIfValidMove(x, y, emptyX, emptyY)) {
    console.log("true");
  } else {
    console.log("false");
  }
}

function puzzleMoveListener(event) {
  movePuzzle(event);
}

puzzles.forEach((puzzle) => {
  puzzle.addEventListener("click", puzzleClickListener);
  puzzle.addEventListener("click", puzzlePositionListener);
  puzzle.addEventListener("click", emptyPositionListener);
  puzzle.addEventListener("click", validMoveListener);
  puzzle.addEventListener("click", movePuzzle);
  puzzle.addEventListener("click", puzzleMoveListener);
});
