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
      if (column === target || column.contains(target)) {
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
      if (column.innerHTML === "") {
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

//switch puzzle with empty space
function movePuzzle(event) {
  let [x, y] = getPuzzlePositionOnBoard(event.target);
  let [emptyX, emptyY] = getEmptyPosition();
  if (checkIfValidMove(x, y, emptyX, emptyY)) {
    let puzzleHTML = gameState[x][y].innerHTML;
    let emptyPuzzle = gameState[emptyX][emptyY];
    emptyPuzzle.innerHTML += puzzleHTML;
    while (gameState[x][y].firstChild) {
      gameState[x][y].removeChild(gameState[x][y].firstChild);
    }
    console.log("Puzzle moved");
  }
}

// listiners for checking if functions work
function puzzleClickListener(event) {
  console.log("clicked");
}

function puzzlePositionListener(event) {
  let [x, y] = getPuzzlePositionOnBoard(event.target);
  console.log(`Puzzle; Row: ${x}, Column: ${y}`);
}

function emptyPositionListener(event) {
  let [emptyX, emptyY] = getEmptyPosition(event.target);
  console.log(`Empty was: Row: ${emptyX}, Column: ${emptyY}`);
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

function puzzleNumberListener(event) {
  let puzzle = event.target;
  if (puzzle.tagName === "IMG") {
    let fileName = puzzle.getAttribute("src");
    let number = fileName.match(/(\d+)\.jpg$/)[1];
    console.log(`Number: ${number}`);
  }
}

puzzles.forEach((puzzle) => {
  puzzle.addEventListener("click", puzzleClickListener);
  puzzle.addEventListener("click", puzzlePositionListener);
  puzzle.addEventListener("click", emptyPositionListener);
  puzzle.addEventListener("click", validMoveListener);
  puzzle.addEventListener("click", movePuzzle);
  puzzle.addEventListener("click", puzzleMoveListener);
  puzzle.addEventListener("click", puzzleNumberListener);
});
