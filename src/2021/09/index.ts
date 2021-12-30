import _ from "lodash";
import "../../arrayExtensions";
export const part1 = (input: string[]): number => {
  const cells: number[][] = input.map((row) =>
    row.split("").map((cell) => parseInt(cell, 10))
  );

  const cellMap: Map<number, Map<number, number>> = new Map();
  input.forEach((row, rowIndex) => {
    row.split("").forEach(((value, colIndex) => {
      let rowMap = cellMap.getOrElse(rowIndex, new Map<number, number>()))
      
      rowMap.put(rowIndex, )

    })
  })

  const nCol = cells[0].length;
  const nRow = cells.length;
  let riskLevel = 0;

  const testLeft = (col: number, row: number, cellVal: number): boolean =>
    row === 0 || cells[col][row - 1] > cellVal;
  const testRight = (col: number, row: number, cellVal: number): boolean =>
    row === nRow - 1 || cells[col][row + 1] > cellVal;
  const testUp = (col: number, row: number, cellVal: number): boolean =>
    col === 0 || cells[col - 1][row] > cellVal;
  const testDown = (col: number, row: number, cellVal: number): boolean =>
    col === nCol - 1 || cells[col + 1][row] > cellVal;
  for (let col = 0; col < nCol; col++) {
    // up to 10
    for (let row = 0; row < nRow; row++) {
      // up to 5
      console.log([row, col, nCol, nRow]);
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
        riskLevel += 1 + cells[col][row];
      }
    }
  }

  return riskLevel;
};
