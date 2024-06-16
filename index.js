const vsModeButton = document.getElementById('vsModeButton');
const soloModeButton = document.getElementById('soloModeButton');
const cells = document.querySelectorAll('[data-cell]');
const turnIndicator = document.getElementById('turnIndicator');
const resetButton = document.getElementById('resetButton');
const modal = document.getElementById('modal');
const confirmReset = document.getElementById('confirmReset');
const cancelReset = document.getElementById('cancelReset');
const boardSizeSelector = document.getElementById('boardSize');
const themeSelector = document.getElementById('theme');
const playerXNameInput = document.getElementById('playerXName');
const playerONameInput = document.getElementById('playerOName');
const setNamesButton = document.getElementById('setNamesButton');
const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');
const resetScoresButton = document.getElementById('resetScoresButton');
const themes = [['❌', '⭕'], ['✘', '🔘'], ['👨', '👩']];

let currTheme = themes[0];
let boardSize = parseInt(boardSizeSelector.value);
let theme = parseInt(themeSelector.value);
let isXTurn = true;
let board = Array(boardSize * boardSize).fill('');
let gameActive = true;
let playerXName = localStorage.getItem('playerXName') || 'Player X';
let playerOName = localStorage.getItem('playerOName') || 'Player O';
let playerXScore = parseInt(localStorage.getItem('playerXScore')) || 0;
let playerOScore = parseInt(localStorage.getItem('playerOScore')) || 0;
let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let cpuScore = parseInt(localStorage.getItem('cpuScore')) || 0;
let soloMode = JSON.parse(localStorage.getItem('soloMode')) || false;
let resetTimeout;

const createBoard = (size) => {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 100px)`;
    grid.style.gridTemplateRows = `repeat(${size}, 100px)`;

    board = Array(size * size).fill('');
    gameActive = true;
    isXTurn = true;
    turnIndicator.textContent = soloMode ? "Player's Turn" : `${playerXName}'s Turn`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell', '');
        cell.addEventListener('click', handleCellClick);
        grid.appendChild(cell);
    }
};

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(document.querySelectorAll('.cell')).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = isXTurn ? currTheme[0] : currTheme[1];
    cell.textContent = board[cellIndex];

    if (checkWin()) {
        gameActive = false;
        if (isXTurn) {
            if (soloMode) {
                playerScore++;
                localStorage.setItem('playerScore', playerScore);
                playerXScoreElement.textContent = `Player: ${playerScore}`;
                turnIndicator.textContent = `Player Wins!`;
            } else {
                playerXScore++;
                localStorage.setItem('playerXScore', playerXScore);
                playerXScoreElement.textContent = `${playerXName}: ${playerXScore}`;
                turnIndicator.textContent = `${playerXName} Wins!`;
            }
        } else {
            if (soloMode) {
                cpuScore++;
                localStorage.setItem('cpuScore', cpuScore);
                playerOScoreElement.textContent = `CPU: ${cpuScore}`;
                turnIndicator.textContent = `CPU Wins!`;
            } else {
                playerOScore++;
                localStorage.setItem('playerOScore', playerOScore);
                playerOScoreElement.textContent = `${playerOName}: ${playerOScore}`;
                turnIndicator.textContent = `${playerOName} Wins!`;
            }
        }
        updateLeaderboard();
        resetTimeout = setTimeout(resetBoard, 5000);
        return;
    }

    if (board.every(cell => cell !== '')) {
        gameActive = false;
        turnIndicator.textContent = `It's a Tie!`;
        resetTimeout = setTimeout(resetBoard, 5000);
        return;
    }

    isXTurn = !isXTurn;
    turnIndicator.textContent = `${isXTurn ? (soloMode ? "Player's" : playerXName) : (soloMode ? "CPU's" : playerOName)} Turn`;

    if (soloMode && !isXTurn) {
        setTimeout(makeRandomMove, 500);
    }
};

const checkWin = () => {
    const lines = [];

    for (let i = 0; i < boardSize; i++) {
        const row = [];
        const col = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(i * boardSize + j);
            col.push(j * boardSize + i);
        }
        lines.push(row, col);
    }

    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < boardSize; i++) {
        diag1.push(i * boardSize + i);
        diag2.push(i * boardSize + (boardSize - 1 - i));
    }
    lines.push(diag1, diag2);

    return lines.some(condition => {
        return condition.every(index => {
            return board[index] === (isXTurn ? currTheme[0] : currTheme[1]);
        });
    });
};

const resetBoard = () => {
    clearTimeout(resetTimeout);
    createBoard(boardSize);
};

const handleResetButton = () => {
    clearTimeout(resetTimeout);
    modal.style.display = 'flex';
};

const handleConfirmReset = () => {
    modal.style.display = 'none';
    resetBoard();
};

const handleCancelReset = () => {
    modal.style.display = 'none';
};


const setPlayerNames = () => {
    playerXName = playerXNameInput.value || 'Player X';
    playerOName = playerONameInput.value || 'Player O';
    localStorage.setItem('playerXName', playerXName);
    localStorage.setItem('playerOName', playerOName);
    updatePlayerNames();
    resetBoard();
};

const updatePlayerNames = () => {
    turnIndicator.textContent = `${soloMode ? "Player's Turn" : playerXName + "'s Turn"}`;
    if (soloMode) {
        playerXScoreElement.textContent = `Player: ${playerScore}`;
        playerOScoreElement.textContent = `CPU: ${cpuScore}`;
    } else {
        playerXScoreElement.textContent = `${playerXName}: ${playerXScore}`;
        playerOScoreElement.textContent = `${playerOName}: ${playerOScore}`;
    }
    updateLeaderboard();
};

const resetScores = () => {
    if (soloMode) {
        playerScore = 0;
        cpuScore = 0;
        localStorage.setItem('playerScore', playerScore);
        localStorage.setItem('cpuScore', cpuScore);
    } else {
        playerXScore = 0;
        playerOScore = 0;
        localStorage.setItem('playerXScore', playerXScore);
        localStorage.setItem('playerOScore', playerOScore);
    }
    updatePlayerNames();
};

const updateLeaderboard = () => {
    if (soloMode) {
        if (playerScore > cpuScore) {
            playerXScoreElement.classList.add('leading');
            playerOScoreElement.classList.remove('leading');
        } else if (cpuScore > playerScore) {
            playerOScoreElement.classList.add('leading');
            playerXScoreElement.classList.remove('leading');
        } else {
            playerXScoreElement.classList.remove('leading');
            playerOScoreElement.classList.remove('leading');
        }
    } else {
        if (playerXScore > playerOScore) {
            playerXScoreElement.classList.add('leading');
            playerOScoreElement.classList.remove('leading');
        } else if (playerOScore > playerXScore) {
            playerOScoreElement.classList.add('leading');
            playerXScoreElement.classList.remove('leading');
        } else {
            playerXScoreElement.classList.remove('leading');
            playerOScoreElement.classList.remove('leading');
        }
    }
};

const makeRandomMove = () => {
    const emptyCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = currTheme[1];
    const cell = document.querySelectorAll('.cell')[randomIndex];
    cell.textContent = currTheme[1];
    if (checkWin()) {
        gameActive = false;
        cpuScore++;
        localStorage.setItem('cpuScore', cpuScore);
        playerOScoreElement.textContent = `CPU: ${cpuScore}`;
        turnIndicator.textContent = `CPU Wins!`;
        setTimeout(resetBoard, 5000);
        updateLeaderboard();
        return;
    }
    isXTurn = !isXTurn;
    turnIndicator.textContent = `${isXTurn ? "Player's Turn" : "CPU's Turn"}`;
};

boardSizeSelector.addEventListener('input', (e) => {
    clearTimeout(resetTimeout); 
    let newSize = parseInt(e.target.value);
    if (newSize >= 3 && newSize <= 10) {
        boardSize = newSize;
        createBoard(boardSize);
    } else {
        e.target.value = boardSize;
    }
});

themeSelector.addEventListener('change', (e) => {
    clearTimeout(resetTimeout); 
    theme = parseInt(e.target.value);
    currTheme = themes[theme];
    createBoard(boardSize);
});

const switchToMode = (isSolo) => {
    clearTimeout(resetTimeout); 
    soloMode = isSolo;
    localStorage.setItem('soloMode', JSON.stringify(soloMode));
    vsModeButton.classList.toggle('active', !isSolo);
    soloModeButton.classList.toggle('active', isSolo);
    updatePlayerNames();
    resetBoard();
};

resetButton.addEventListener('click', handleResetButton);
confirmReset.addEventListener('click', handleConfirmReset);
cancelReset.addEventListener('click', handleCancelReset);
setNamesButton.addEventListener('click', setPlayerNames);
resetScoresButton.addEventListener('click', resetScores);
vsModeButton.addEventListener('click', () => switchToMode(false));
soloModeButton.addEventListener('click', () => switchToMode(true));

// Default state
updatePlayerNames();
createBoard(boardSize);
switchToMode(soloMode); 