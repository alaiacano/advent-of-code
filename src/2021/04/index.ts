import { BingoInput, Board } from "./parser";

/**
 * This is the workhorse function. It will:
 *
 * For each [Board], see if the `draw` is in it, and remove the number from any of
 * the possible winners within that Board. Each "possible winner" is a Set<number> of the
 * remaining numbers on that row/column.
 *
 * If one of those possible winners is empty, it means that row/column wins and we _yield_ it.
 *
 * For part 1, we'll be done once the first winner is found. For part 2 we will keep going until
 * the last winner is found.
 *
 * @param draw The currently drawn number that we are looking for on all the boards.
 * @param boards The current state of all of the boards, with already-drawn numbers removed.
 */
function* runner(draw: number, boards: Board[]) {
  // loop through the boards
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    // If this board has been removed because it's already a winner, skip.
    if (boards[boardIndex].length === 0) {
      continue;
    }
    // loop through the possible sets (rows or columns) in each board
    for (let setIndex = 0; setIndex < boards[boardIndex].length; setIndex++) {
      // Remove this draw from the currentSet if it's in there.
      const currentSet = boards[boardIndex][setIndex];
      currentSet.delete(draw);
      if (currentSet.size === 0) {
        // Someone won!
        boards[boardIndex][setIndex] = currentSet;
        yield boardIndex;
      }
    }
  }
}

export const part1 = (input: BingoInput): number => {
  // Loop through all of the draws in the Bingo game.
  for (let draw of input.draws) {
    // For each draw, check if it's a winner. If so, `runner` will
    // return the index of the winning board.
    for (let winningBoardIndex of runner(draw, input.boards)) {
      return draw * remainingBoardSum(input.boards[winningBoardIndex]);
    }
  }
  return 0;
};

export const part2 = (input: BingoInput): number => {
  const inputCopy = Object.assign([], [...input.boards]);

  // Keep track of the most recently seen winner score.
  let lastWinner = 0;

  // Loop through all of the draws in the Bingo game.
  // There's no early exit on this loop like in part 1.
  for (let i = 0; i < input.draws.length; i++) {
    const currentDraw = input.draws[i];

    // Loop through all of the boards to see if any are winners.
    // For a winner, we will record it's score in `lastWinner` and
    // remove the board from the list of contenders.
    for (let winningBoardIndex of runner(currentDraw, input.boards)) {
      lastWinner =
        currentDraw * remainingBoardSum(input.boards[winningBoardIndex]);
      // Remove this board from further consideration.
      input.boards[winningBoardIndex] = [];
    }
  }
  return lastWinner;
};

const remainingBoardSum = (board: Board): number => {
  let remainingSum = 0;
  for (let row of board.slice(0, 5)) {
    for (let space of row) {
      remainingSum += space;
    }
  }
  return remainingSum;
};
