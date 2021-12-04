import { BingoInput, Board, boardParser } from "./parser";
import "../../arrayExtensions";

type Ret = {
  winningBoardIndex?: number;
  maxSize: number;
};

function* runner(draw: number, boards: Board[]) {
  // loop through the boards
  for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    // If this board has been removed because it's already a winner, skip.
    if (boards[boardIndex].length === 0) {
      continue;
    }
    // loop through the possible sets (rows or columns) in each board
    for (let setIndex = 0; setIndex < boards[boardIndex].length; setIndex++) {
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
  const checkBoards = (nextMove: number): Ret => {
    let maxMatch = 0;

    // loop through the boards
    for (let boardIndex = 0; boardIndex < input.boards.length; boardIndex++) {
      const board = input.boards[boardIndex];
      // loop through the winning sets in each board
      for (
        let winningSetIndex = 0;
        winningSetIndex < board.length;
        winningSetIndex++
      ) {
        const winningSet = board[winningSetIndex];
        winningSet.delete(nextMove);
        if (winningSet.size === 0) {
          // Someone won!
          return { winningBoardIndex: boardIndex, maxSize: 5 };
        } else {
          // update the global state indicating that a space was removed
          input.boards[boardIndex][winningSetIndex] = winningSet;
          // Keep track of the max score to return if there is no winner.
          maxMatch = Math.max(maxMatch, 5 - winningSet.size);
        }
      }
    }
    return { maxSize: maxMatch };
  };

  for (let draw of input.draws) {
    let { winningBoardIndex } = checkBoards(draw);
    if (winningBoardIndex !== undefined) {
      // someone won! calculate the sum of the remaining.
      let remainingSum: number = 0;
      // since we double all of the boards (rows + cols), just loop through the first 5 to sum.
      for (let board of input.boards[winningBoardIndex].slice(0, 5)) {
        for (let space of board) {
          remainingSum += space;
        }
      }
      return remainingSum * draw;
    }
  }
  return -1;
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

export const part2 = (input: BingoInput): number => {
  const inputCopy = Object.assign([], [...input.boards]);
  let lastWinner = 0;
  for (let i = 0; i < input.draws.length; i++) {
    const currentDraw = input.draws[i];
    const gen = runner(currentDraw, input.boards);

    for (let winningBoardIndex of gen) {
      lastWinner =
        currentDraw * remainingBoardSum(input.boards[winningBoardIndex]);
      input.boards[winningBoardIndex] = [];
    }
  }
  return lastWinner;
};
