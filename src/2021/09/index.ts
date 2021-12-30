import _ from "lodash";
import internal from "stream";

export const part1 = (input: string[]): number => {
  const cells: number[][] = input.map((row) =>
    row.split("").map((cell) => parseInt(cell, 10))
  );

  const nCol = input[0].length;
  const nRow = input.length;
  let riskLevel = 0;

  const testLeft = (col: number, row: number, cellVal: number): boolean =>
    col === 0 || cells[row][col - 1] > cellVal;
  const testRight = (col: number, row: number, cellVal: number): boolean =>
    col === nCol - 1 || cells[row][col + 1] > cellVal;
  const testUp = (col: number, row: number, cellVal: number): boolean =>
    row === 0 || cells[row - 1][col] > cellVal;
  const testDown = (col: number, row: number, cellVal: number): boolean =>
    row === nRow - 1 || cells[row + 1][col] > cellVal;

  for (let col = 0; col < nCol; col++) {
    for (let row = 0; row < nRow; row++) {
      const currentValue = cells[row][col];
      if (currentValue === 9) {
        continue;
      }
      if (
        testLeft(col, row, currentValue) &&
        testRight(col, row, currentValue) &&
        testUp(col, row, currentValue) &&
        testDown(col, row, currentValue)
      ) {
        riskLevel += 1 + cells[row][col];
      }
    }
  }

  return riskLevel;
};
