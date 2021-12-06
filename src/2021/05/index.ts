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

    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        observe(x, y);
      }
    }
  }

  return visitedTwice.size;
};
