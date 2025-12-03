// @ts-check
(() => {
  const state = {
    /** @type {"X" | "O"} */
    currentPlayer: "X",
    isGameOver: false,
    isTie: false,
  };

  /** @type {Array<Array<"X" | "O" | null>>} */
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  /** @type{HTMLElement[]} */
  const cells = Array.from(document.querySelectorAll(".board__row__item"));
  const gameStatus = document.getElementById("game-status");

  if (!gameStatus) {
    throw new Error("No `#game-status` element found.");
  }

  const updateGameStatus = () => {
    if (!state.isGameOver) {
      gameStatus.textContent = `It's ${state.currentPlayer}'s turn to move!`;
    } else if (state.isTie) {
      gameStatus.textContent = "It's a Tie!";
    } else {
      gameStatus.textContent = `${state.currentPlayer} is the winner!`;
    }
  };

  /**
   * @param {HTMLElement} cell
   */
  const getCellPosition = cell => {
    const cellIdx = cells.findIndex(currentCell => currentCell === cell);

    const colIdx = cellIdx % 3;
    const rowIdx = Math.floor(cellIdx / 3);

    return {
      rowIdx,
      colIdx,
    };
  };

  const updateBoard = () => {
    board.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        if (!col) return;

        const cellIdx = rowIdx * 3 + colIdx;
        const cell = cells[cellIdx];

        cell.classList.add(`board__row__item--${col.toLowerCase()}`);
      });
    });
  };

  const getWinner = () => {
    // Check main diagonal
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== null
    ) {
      return state.currentPlayer;
    }
    // Check cross diagonal
    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== null
    ) {
      return state.currentPlayer;
    }
    // Check columns
    for (let colIdx = 0; colIdx < board[0].length; colIdx++) {
      if (
        board[0][colIdx] === board[1][colIdx] &&
        board[0][colIdx] === board[2][colIdx] &&
        board[0][colIdx] !== null
      ) {
        return state.currentPlayer;
      }
    }
    // Check rows
    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      if (
        board[rowIdx][0] === board[rowIdx][1] &&
        board[rowIdx][0] === board[rowIdx][2] &&
        board[rowIdx][0] !== null
      ) {
        return state.currentPlayer;
      }
    }

    // There are empty cells
    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      for (let colIdx = 0; colIdx < board[0].length; colIdx++) {
        const cell = board[rowIdx][colIdx];

        // Neither has a winner nor is a tie
        if (!cell) return null;
      }
    }

    // No empty cells and no winning condition, therefore it's a tie!
    return "TIE";
  };

  /**
   * @param {MouseEvent} event
   */
  const handleClick = event => {
    if (state.isGameOver) return;

    const cell = /** @type {HTMLElement | null} */ (event.currentTarget);

    if (!cell) return;

    const { colIdx, rowIdx } = getCellPosition(cell);

    // Don't refill the cell when it's already filled
    if (board[rowIdx][colIdx] !== null) return;

    board[rowIdx][colIdx] = state.currentPlayer;

    const winner = getWinner();

    // If there's no winner and it's not a tie
    if (winner === null) {
      if (state.currentPlayer === "O") state.currentPlayer = "X";
      else state.currentPlayer = "O";
    } else {
      state.isGameOver = true;

      if (winner === "TIE") state.isTie = true;
    }

    // Re-render the board with the new state
    updateBoard();
    // Update the game status
    updateGameStatus();
  };

  cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
  });

  // Initial render of the game status
  updateGameStatus();
})();
