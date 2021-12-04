import { BingoInput, boardParser } from "./parser";
import "../../arrayExtensions";

type Ret = {
  winningBoardIndex?: number;
  maxSize: number;
};

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
  return 0;
};
