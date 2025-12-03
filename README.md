# Tic-Tac-Toe Game

A simple, interactive **Tic-Tac-Toe** game built with plain **HTML, CSS, and JavaScript**.  
This project demonstrates DOM manipulation, game state management, and basic game logic without using any frameworks.

---

## Features

- Two-player gameplay (X and O)
- Automatically detects:
  - Winner (rows, columns, and both diagonals)
  - Tie games  
- Clean UI with visual indicators for X and O
- Real-time status updates (whose turn it is, winner, or tie)
- Modular and readable JavaScript structure

---

## How It Works

The game's logic is handled entirely in JavaScript:

- A `3x3` matrix stores the board state.
- Each click updates the board and checks:
  - Winning rows  
  - Winning columns  
  - Both diagonals  
  - Whether the board is full (tie)
- The UI is updated based on the internal game state.

---

## Project Structure

 - index.html # Game layout & UI
  - style.css # Styling for the board and markers
  - script.js # Full game logic (provided above)
