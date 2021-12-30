import _ from "lodash";
import "../../arrayExtensions";

function findLowPoints(cells: number[][]): number[][] {
  const nRow = cells.length;
  const nCol = cells[0].length;
  let lowPoints = [];
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
        lowPoints.push([row, col]);
      }
    }
  }
  return lowPoints;
}

export const part1 = (input: string[]): number => {
  const cells: number[][] = input.map((row) =>
    row.split("").map((cell) => parseInt(cell, 10))
  );

  return findLowPoints(cells).foldLeft((acc: number, cell: number[]) => {
    const [row, col] = cell;
    return acc + 1 + cells[row][col];
  }, 0);
};
