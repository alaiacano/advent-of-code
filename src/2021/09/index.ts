import "../../arrayExtensions";
import _ from "lodash";
import * as Collections from "typescript-collections";

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
type Cell = {
  row: number;
  col: number;
  value: number;
};
type Basin = {
  cells: Collections.Set<Cell>;
};

function findLowPoints(cells: number[][]): Cell[] {
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
        lowPoints.push({ row: row, col: col, value: cells[row][col] });
      }
    }
  }
  return lowPoints;
}

export const part1 = (input: string[]): number => {
  const cells: number[][] = input.map((row) =>
    row.split("").map((cell) => parseInt(cell, 10))
  );

  return findLowPoints(cells).foldLeft((acc: number, cell: Cell) => {
    return acc + 1 + cell.value;
  }, 0);
};

type CellNode = {
  row: number;
  col: number;
  value: number;
  children: CellNode[];
};

export const part2 = (input: string[]): number => {
  const cells: number[][] = input.map((row) =>
    row.split("").map((cell) => parseInt(cell, 10))
  );

  // These tests will be useful here.
  const nRow = cells.length;
  const nCol = cells[0].length;

  const lowPoints = findLowPoints(cells);

  function findBasin(
    cellsToCheck: Collections.Set<Cell>,
    seenSoFar: Collections.Set<Cell>
  ): Collections.Set<Cell> {
    // Exit condition: no more cells to check. Return everything we've seen.
    if (cellsToCheck.size() === 0) {
      return seenSoFar;
    }

    const nextCellsToCheck: Collections.Set<Cell> = new Collections.Set(
      (item) => JSON.stringify(item)
    );
    cellsToCheck.forEach((testCell) => {
      if (testCell.col > 0) {
        const leftCell = {
          col: testCell.col - 1,
          row: testCell.row,
          value: cells[testCell.row][testCell.col - 1],
        };
        if (!seenSoFar.contains(leftCell) && leftCell.value < 9) {
          seenSoFar.add(leftCell);
          nextCellsToCheck.add(leftCell);
        }
      }

      if (testCell.col < nCol - 1) {
        const rightCell = {
          col: testCell.col + 1,
          row: testCell.row,
          value: cells[testCell.row][testCell.col + 1],
        };
        if (!seenSoFar.contains(rightCell) && rightCell.value < 9) {
          seenSoFar.add(rightCell);
          nextCellsToCheck.add(rightCell);
        }
      }

      if (testCell.row > 0) {
        const upCell = {
          col: testCell.col,
          row: testCell.row - 1,
          value: cells[testCell.row - 1][testCell.col],
        };
        if (!seenSoFar.contains(upCell) && upCell.value < 9) {
          seenSoFar.add(upCell);
          nextCellsToCheck.add(upCell);
        }
      }

      if (testCell.row < nRow - 1) {
        const downCell = {
          col: testCell.col,
          row: testCell.row + 1,
          value: cells[testCell.row + 1][testCell.col],
        };
        if (!seenSoFar.contains(downCell) && downCell.value < 9) {
          seenSoFar.add(downCell);
          nextCellsToCheck.add(downCell);
        }
      }
    });
    return findBasin(nextCellsToCheck, seenSoFar);
  }

  const basins: Basin[] = [];
  lowPoints.forEach((lowPoint) => {
    // check if we've already mapped a basin containing this Cell
    if (basins.find((basin) => basin.cells.contains(lowPoint)) !== undefined) {
      return;
    }
    const start = new Collections.Set<Cell>((item) => JSON.stringify(item));
    start.add({
      col: lowPoint.col,
      row: lowPoint.row,
      value: lowPoint.value,
    });
    const basinPoints = findBasin(start, start);
    basins.push({ cells: basinPoints });
  });

  return _(basins)
    .sortBy((b) => -b.cells.size())
    .take(3)
    .value()
    .map((b) => b.cells.size())
    .reduce((a, b) => a * b);
};
