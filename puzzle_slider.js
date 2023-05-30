const board = document.getElementById("board");
const puzzles = document.querySelectorAll(".puzzle");
const gameState = [
  [puzzles[0], puzzles[1], puzzles[2]],
  [puzzles[3], puzzles[4], puzzles[5]],
  [puzzles[6], puzzles[7], puzzles[8]],
];
let puzzleMoved = false;
let count = 0;
// Return clicked puzzle position in gameState
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

// Return empty puzzle position in gameState
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

// Check if puzzle can move
function checkIfValidMove(x, y, emptyX, emptyY) {
  return (
    (emptyX === x + 1 && emptyY === y) || // down
    (emptyX === x - 1 && emptyY === y) || // up
    (emptyX === x && emptyY === y + 1) || // right
    (emptyX === x && emptyY === y - 1) // left
  );
}

// Move puzzle to the empty space
function movePuzzle(x, y, emptyX, emptyY) {
  let puzzleHTML = gameState[x][y].innerHTML;
  let emptyPuzzle = gameState[emptyX][emptyY];
  emptyPuzzle.innerHTML += puzzleHTML;
  gameState[x][y].innerHTML = "";
  console.log("Puzzle moved");
  puzzleMoved = true;
}
function moveCounter() {
  if (puzzleMoved) {
    count++;
    let counter = document.getElementById("counter");
    counter.innerText = `Moves ${count}`;
    puzzleMoved = false;
  }
}
// Puzzle click event listener
function puzzleClickListener(event) {
  let [x, y] = getPuzzlePositionOnBoard(event.target);
  console.log(`Clicked: Row: ${x}, Column: ${y}`);
}

// Puzzle number click event listener
function puzzleNumberListener(event) {
  let puzzle = event.target;
  if (puzzle.tagName === "IMG") {
    let fileName = puzzle.getAttribute("src");
    let number = fileName.match(/(\d+)\.jpg$/)[1];
    console.log(`Number: ${number}`);
  }
}

// Add event listeners to puzzles
puzzles.forEach((puzzle) => {
  puzzle.addEventListener("click", puzzleClickListener);
  puzzle.addEventListener("click", puzzleNumberListener);
});

// Puzzle move event listener
board.addEventListener("click", function (event) {
  let [x, y] = getPuzzlePositionOnBoard(event.target);
  let [emptyX, emptyY] = getEmptyPosition();
  if (checkIfValidMove(x, y, emptyX, emptyY)) {
    movePuzzle(x, y, emptyX, emptyY);
    moveCounter();
  }
});
