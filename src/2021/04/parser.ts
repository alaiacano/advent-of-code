import * as fs from "fs";

export const boardParser = (input: string): BingoInput => {
  const inputRows = input.split("\n");

  // These are the draws in the bingo game.
  const draws = inputRows[0].split(",").map((x) => parseInt(x, 10));

  let boards = [];

  for (let i = 2; i <= inputRows.length - 5; i += 6) {
    // Chunk is a single board. We can iterate through it and populate
    // the solutions for this board.
    const chunk = inputRows.slice(i, i + 5);

    // these are all of the possible solutions for this board. 5 rows, 5 cols.
    let board: Set<number>[] = Array.from({ length: 10 }, (x) => new Set());

    chunk.forEach((rowStr, rowIdx) => {
      // a single line, we need to split on " " and put it in the sets.
      const boardRow = rowStr
        .trim()
        .split(/\s+/)
        .map((x) => parseInt(x, 10));
      for (let n = 0; n < 5; n++) {
        board[n].add(boardRow[n]);
        board[rowIdx + 5].add(boardRow[n]);
      }
    });
    boards.push(board);
  }
  return { draws: draws, boards: boards };
};

export const inputData: BingoInput = boardParser(
  fs
    .readFileSync(
      "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/04/input.txt",
      "utf8"
    )
    .trimEnd()
);

export type Board = Set<number>[];
export type BingoInput = {
  draws: number[];
  boards: Board[];
};
