// Game Variables
let currentPlayer = "X";
let gameActive = true;
let moves = 0;
let gameEnded = false;

// Player Names
let player1Name = "";
let player2Name = "";

// DOM Elements
const playerDisplay = document.getElementById("playerDisplay");
const boardSection = document.getElementById("boardSection");
const resetButton = document.getElementById("resetButton");
const cells = document.querySelectorAll(".cell");
const messageBox = document.getElementById("messageBox");
const newGameCard = document.getElementById("newGameCard");
const startAgainButton = document.getElementById("startAgain");
const newGameButton = document.getElementById("newGame");

// Function to Start the Game
function startGame() {
  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;

  // Check if player names are entered
  if (!player1Name || !player2Name) {
    playerDisplay.textContent = "Enter players Name";
    return;
  }

  // Update Player Names
  playerDisplay.textContent = `${player1Name} (X) vs ${player2Name} (O)`;

  // Show the Game Board
  boardSection.style.display = "grid";

  // Hide the Settings Card
  settingsCard.style.display = "none";

  // Enable Cell Click Events
  cells.forEach((cell) => cell.addEventListener("click", makeMove));

  // Show the Reset Button
  resetButton.style.display = "block";
}

// Function to Make a Move
function makeMove() {
  if (!gameActive || gameEnded) return;

  if (this.textContent === "") {
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    // Change font theme and color
    if (currentPlayer === "X") {
      this.style.color = "red";
    
    } else {
      this.style.color = "blue";
    
    }

    moves++;

    if (checkWin()) {
      messageBox.textContent = ` ${currentPlayer === "X" ? player1Name : player2Name} wins!`;
      endGame();
      return;
    } else if (moves === 9) {
      messageBox.textContent = "It's a draw!";
      endGame();
      return;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      playerDisplay.textContent =
        currentPlayer === "X"
          ? `${player1Name} (X) turn`
          : `${player2Name} (O) turn`;
    }
  }
}

// Function to Check for a Win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
  }

  return false;
}

// Function to End the Game
function endGame() {
  gameActive = false;
  cells.forEach((cell) => cell.removeEventListener("click", makeMove));
  resetButton.style.display = "none";
  boardSection.style.display = "none";
  showNewGameCard();
  gameEnded = true;
  playerDisplay.style.display = "none";
}

// Function to Show the New Game Card
function showNewGameCard() {
  newGameCard.style.display = "block";
}

// Function to Start Again
function startAgain() {
  resetGame();
  hideNewGameCard();
  startGame();
}

// Function to Start a New Game
function newGame() {
  resetGame();
  hideNewGameCard();
  settingsCard.style.display = "block";
  player1Name = "";
  player2Name = "";
  document.getElementById("player1").value = "";
  document.getElementById("player2").value = "";

  // Check if player names are entered
  if (!player1Name || !player2Name) {
    playerDisplay.textContent = "Enter player names";
    return;
  }

  playerDisplay.style.display = "none";
}

// Function to Reset the Game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  moves = 0;
  gameEnded = false;

  for (let cell of cells) {
    cell.textContent = "";
    cell.classList.remove("win");
  }

  playerDisplay.textContent = `${player1Name || "Player 1"} (X) turn`;
  playerDisplay.style.display = "block";
}

// Function to Hide the New Game Card
function hideNewGameCard() {
  newGameCard.style.display = "none";
}

// Event Listeners
startAgainButton.addEventListener("click", startAgain);
newGameButton.addEventListener("click", newGame);

// ... (Remaining code)
