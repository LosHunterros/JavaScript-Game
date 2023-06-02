const IMAGE = "static/goldfish/";
const board = document.getElementById("board");
const puzzles = document.querySelectorAll(".puzzle");
let gameState = [
  [puzzles[0], puzzles[1], puzzles[2]],
  [puzzles[3], puzzles[4], puzzles[5]],
  [puzzles[6], puzzles[7], puzzles[8]],
];

const sfx = new Audio();
sfx.src = "static/sound/click.mp3";
sfx.preload = "auto";
let puzzleMoved = false;
let count = 0;

function shuffle() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameState[i][j].innerHTML = "";
    }
  }
  for (let i = 1; i <= 8; ) {
    let randomX = Math.floor(Math.random() * 3);
    let randomY = Math.floor(Math.random() * 3);

    if (gameState[randomX][randomY].innerHTML === "") {
      gameState[randomX][randomY].innerHTML += `<p>${i}</p>`;
      gameState[randomX][
        randomY
      ].innerHTML += ` <img src="static/goldfish/${i}.jpg" />`;

      i++;
    }
  }
}
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
  let puzzle = gameState[x][y];
  let emptyPuzzle = gameState[emptyX][emptyY];
  emptyPuzzle.innerHTML += puzzle.innerHTML;
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

shuffle();

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

// Check if Player won
function checkIfWon() {
  let k = 1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (k < 9) {
        currentPuzzle = gameState[i][j].getElementsByTagName("IMG");
        if ( !currentPuzzle[0] || currentPuzzle[0].getAttribute("src") != `static/goldfish/${k}.jpg` ) {
          console.log(false);
          return false;
        }
      }
      k++;
    }
  }
  console.log(true);
  return true
}

// Restart Game
function restartGame() {
  count = 0;
  let counter = document.getElementById("counter");
  counter.innerText = `Moves ${count}`;
  puzzleMoved = false;
  shuffle();
};

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
    if (!sfx.paused) {
      sfx.currentTime = 0;
    }
    sfx.play();
    movePuzzle(x, y, emptyX, emptyY);
    moveCounter();
    if ( checkIfWon() ) {
      alert(`You won in ${count} moves! Klick 'ok' to play again`)
      restartGame()
    }
  }
});