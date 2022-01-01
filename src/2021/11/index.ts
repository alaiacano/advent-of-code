import * as Collections from "typescript-collections";
import _ from "lodash";
export type Point = {
  x: number;
  y: number;
};

function getNeighbors(p: Point, maxX: number, maxY: number): Point[] {
  return [
    { x: p.x, y: p.y },
    { x: p.x - 1, y: p.y },
    { x: p.x + 1, y: p.y },
    { x: p.x, y: p.y - 1 },
    { x: p.x, y: p.y + 1 },
    { x: p.x + 1, y: p.y - 1 },
    { x: p.x + 1, y: p.y + 1 },
    { x: p.x - 1, y: p.y - 1 },
    { x: p.x - 1, y: p.y + 1 },
  ].filter(
    (pp) => pp.x >= 0 && pp.x <= maxX - 1 && pp.y >= 0 && pp.y <= maxY - 1
  );
}
/**
 * Increases all of the locations around the given point in the grid and returns a list of Points
 * that need to be flashed in the next step.
 *
 * @param point
 * @param grid
 */
function flash(point: Point, grid: number[][]): Point[] {
  const neighbors = getNeighbors(point, grid[0].length, grid.length);
  const needsFlash: Point[] = [];
  for (const n of neighbors) {
    grid[n.y][n.x] += 1;
    if (grid[n.y][n.x] > 9) {
      needsFlash.push(n);
    }
  }
  return needsFlash;
}

function emptyCollection() {
  return new Collections.Set<Point>((item) => `${item.x},${item.y}`);
}

type Result = {
  numFlashes: number;
  numSteps: number;
};
export const part1 = (
  grid: number[][],
  nSteps: number,
  stopOnAllFlash: boolean
): Result => {
  let nFlashes = 0;
  let step = 0;

  while (step < nSteps) {
    step += 1;
    const needsToFlash = emptyCollection();
    const alreadyFlashed = emptyCollection();

    // first, everyone increases by 1. Keep track of any who need to flash.
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        grid[y][x] += 1;
        if (grid[y][x] > 9) {
          needsToFlash.add({ x: x, y: y });
        }
      }
    }

    // note: additionalRequiredFlashes should be a Set but they don't work well with objects
    // and Collections.Set doesn't have a `filter` method, which is needed. The duplication is
    // fine though.
    const additionalRequiredFlashes: Point[] = [];
    // needsToFlash are the ones from the increment-by-1 step.
    // newRequiredFlashes are the ones that show up after subsequent flashes
    while (!needsToFlash.isEmpty()) {
      needsToFlash.forEach((point) => {
        // If it already flashed, skip. Otherwise flash it.
        if (!alreadyFlashed.contains(point)) {
          alreadyFlashed.add(point);
          nFlashes += 1;
          flash(point, grid).forEach((newPoint) =>
            additionalRequiredFlashes.push(newPoint)
          );
        }
      });

      // Reset the flashes that are needed. Refill with any that haven't flashed this step.
      needsToFlash.clear();
      additionalRequiredFlashes
        .filter((p) => !alreadyFlashed.contains(p))
        .forEach((p) => needsToFlash.add(p));
    }

    // Break if all elements flashed.
    if (
      stopOnAllFlash === true &&
      alreadyFlashed.size() === grid.length * grid[0].length
    ) {
      break;
    }

    // set any over 9 back to 0
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] > 9) {
          grid[y][x] = 0;
        }
      }
    }
  }
  return { numFlashes: nFlashes, numSteps: step };
};

export const part2 = (grid: number[][]): Result => {
  return part1(grid, 1000, true);
};
