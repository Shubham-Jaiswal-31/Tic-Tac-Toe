# Tic Tac Toe Game

Welcome to the Tic Tac Toe Game! This project showcases a classic Tic Tac Toe game built using HTML, CSS, and JavaScript with additional features for an enhanced user experience.

## Features

### Game Features
1. **Classic Tic Tac Toe Gameplay**:
    - A 3x3 grid game board.
    - Players take turns to place their symbols (X or O) on the board.
    - The game checks for win or tie conditions after each move.
    - Displays the result and resets the board after 5 seconds.

2. **Game Status Indicator**:
    - Shows whose turn it is during the game.

3. **Game Reset**:
    - A reset button to start a new game at any point.
    - Displays a modal warning that the current game will reset and gives the option to reset or cancel.

4. **Variable Board Sizes (Bonus)**:
    - Allows players to choose between different grid sizes: 3x3, 4x4, or 5x5.
    - Ensures the winning condition for an N×N board is "N same symbols in a straight line".

5. **Solo Mode**:
    - Allows players to play against the computer.
    - The computer makes random moves.

### Design Features
1. **Attractive Title and Graphics**:
    - An eye-catching title/subtitle at the top of the website.
    - A suitable graphic/icon for the game displayed beside the title.

2. **Responsive Layout**:
    - A layout that works well on both desktop and mobile devices.
    - Clean, minimalist design with simple animations.

3. **Leaderboard**:
    - Maintains a leaderboard showing the winning status between Player 1 and Player 2.
    - Allows users to reset the scores.
    - Highlights the player leading.

4. **Customizable Player Names (Bonus)**:
    - Allows users to change their names from "Player 1/2" to any name of their choice.
    - Stores data in `localStorage` to retain scores and player names even after refreshing the page.

5. **Code Quality**:
    - Reusable, easy-to-read code following the DRY (Don't Repeat Yourself) principle.

## Setup Instructions

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/yourusername/tictactoe-game.git
    cd tictactoe-game
    ```

2. **Open the Project**:
    Open the project in your preferred code editor (e.g., VSCode).

3. **Run the Project**:
    Open the `index.html` file in your browser to see the game in action.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

---

Enjoy the game!
