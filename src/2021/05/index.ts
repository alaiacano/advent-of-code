import internal from "stream";
import "../../arrayExtensions";
import * as _ from "lodash";
import { lineReader } from "../../types";

type Line = {
  p1: number[];
  p2: number[];
};

export const lineParser = (l: string): Line => {
  let [start, end] = l.split(/ -\> /);
  return {
    p1: start.split(",", 2).map((p) => parseInt(p, 10)),
    p2: end.split(",", 2).map((p) => parseInt(p, 10)),
  };
};

export const inputData = lineReader<Line>(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/05/input.txt",
  lineParser
);

export const part1 = (lines: Line[], skipDiagonal: boolean): number => {
  // Go through all of the lines and count how many times each location is visited.
  let visitedOnce = new Set<string>();
  let visitedTwice = new Set<string>();
  for (let line of lines) {
    const [x1, y1] = line.p1;
    const [x2, y2] = line.p2;
    if (skipDiagonal && x1 !== x2 && y1 !== y2) {
      continue;
    }
    const observe = (x: number, y: number): void => {
      // Keys in javascript can't be arrays or tuples. So we turn them back into strings.
      const key = `${x},${y}`;
      if (visitedOnce.has(key)) {
        visitedTwice.add(key);
      } else {
        visitedOnce.add(key);
      }
    };

    // Make arrays of x's and y's so that we can zip them together.
    // if x is different between point 1 and 2, we get the range
    // If x or y is the same for each point, we need to duplicate it range.length times.
    const xs =
      x1 === x2
        ? Array.from({ length: Math.abs(y2 - y1) + 1 }, (key) => x1)
        : range(x1, x2);
    const ys =
      y1 === y2
        ? Array.from({ length: Math.abs(x2 - x1) + 1 }, (key) => y1)
        : range(y1, y2);

    _.zip(xs, ys).forEach((xy) => observe(xy[0] as number, xy[1] as number));
  }

  return visitedTwice.size;
};

// Yet another thing I would have expected to have in typescript!
export const range = (start: number, end: number) => {
  return Array.from(
    { length: Math.abs(end - start) + 1 },
    (v: number, key: number) => (end > start ? key + start : start - key)
  );
};
