import "../../arrayExtensions";
import _ from "lodash";
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
  cells: Set<Cell>;
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

  // TODO: This is a depth-first that apparently never finishes. Need to do breadth-first

  // find the basins by starting at the low points and recursing up/out.
  let recursions = 0;
  const findBasin = (
    testCell: Cell,
    contents: Set<Cell>,
    skipDirection: Set<Direction>
  ): Set<Cell> => {
    recursions += 1;
    if (recursions > 5) {
      throw "done";
    }
    console.log(`Checking cell ${JSON.stringify(testCell)}`);
    if (testCell.value == 9 || contents.has(testCell)) {
      console.log(`exiting for cell ${JSON.stringify(testCell)}`);
      return new Set();
    }
    contents.add(testCell);
    // Search left/right
    if (!skipDirection.has(Direction.LEFT) && testCell.col > 0) {
      console.log("MOVING LEFT");
      findBasin(
        {
          col: testCell.col - 1,
          row: testCell.row,
          value: cells[testCell.row][testCell.col - 1],
        },
        contents,
        new Set([Direction.RIGHT])
      ).forEach((v) => contents.add(v));
    }
    if (!skipDirection.has(Direction.RIGHT) && testCell.col < nCol - 1) {
      console.log("MOVING RIGHT");
      findBasin(
        {
          col: testCell.col + 1,
          row: testCell.row,
          value: cells[testCell.row][testCell.col + 1],
        },
        contents,
        new Set([Direction.LEFT])
      ).forEach((v) => contents.add(v));
    }

    // Search up/down
    if (!skipDirection.has(Direction.UP) && testCell.row > 0) {
      console.log("MOVING UP");
      findBasin(
        {
          col: testCell.col,
          row: testCell.row - 1,
          value: cells[testCell.row - 1][testCell.col],
        },
        contents,
        new Set([Direction.DOWN])
      ).forEach((v) => contents.add(v));
    }
    if (!skipDirection.has(Direction.DOWN) && testCell.col < nRow - 1) {
      console.log("MOVING DOWN");
      findBasin(
        {
          col: testCell.col,
          row: testCell.row + 1,
          value: cells[testCell.row + 1][testCell.col],
        },
        contents,
        new Set([Direction.UP])
      ).forEach((v) => contents.add(v));
    }
    return contents;
  };

  const basins: Basin[] = [];
  lowPoints.forEach((lowPoint) => {
    // check if we've already mapped a basin containing this Cell
    if (basins.find((basin) => basin.cells.has(lowPoint)) !== undefined) {
      return;
    }
    const basinPoints = findBasin(lowPoint, new Set(), new Set());
    basins.push({ cells: basinPoints });
  });

  return _(basins)
    .sortBy((b) => -b.cells.size)
    .take(3)
    .map((b) => b.cells.size)
    .value()
    .reduce((a, b) => a * b);
};
