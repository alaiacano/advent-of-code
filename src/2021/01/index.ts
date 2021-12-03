import "../../arrayExtensions";
import { lineReader } from "../../types";

export const inputData = lineReader<number>(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/01/input.txt",
  (l: string) => parseInt(l, 10)
);

const solution = (input: number[], gap: number): number => {
  let increases = 0;
  for (let i = gap; i <= input.length; i++) {
    if (input[i] > input[i - gap]) {
      increases += 1;
    }
  }
  return increases;
};

export const part1 = (input: number[]): number => {
  return solution(input, 1);
};

/**
 * Probably the most efficient answer. Instead of a gap of 1, we now have a gap of 3.
 * 199  A
 * 200  A B
 * 208  A B C
 * 210    B C D    <- at this point, the B window and A window overlap on index 1 and 2.
 * 200  E   C D       we need to make sure that index 3 is greater than index 0.
 * 207  E F   D
 * 240  E F G
 * 269    F G H
 * 260      G H
 * 263        H
 */
export const part2 = (input: number[]): number => {
  if (input.length < 4) {
    return 0;
  }

  return solution(input, 3);
};

/////////////////////////////////////////////
// The following are for fun/learning.
/////////////////////////////////////////////

/**
 * I made `Array.prototype.slidingApply` to break the array into length-3 sub-arrays
 * and then perform an aggregation function on the sub-array (sum). Now I have an array containing the
 * sums of each window, which I send into the part1 solution to find how many increase from one element
 * to the next.
 */
export const part2Sliding = (input: number[]): number => {
  if (input.length < 4) {
    return 0;
  }
  const sum = (a: number, b: number) => a + b;
  const sums = input.slidingApply(3, (s) => s.reduce(sum));
  return solution(sums, 1);
};

/**
 * Take 4: I was made aware that you don't need to sum each window because two of the items overlap
 * between each window. So taking the difference of the items on either side of them (items `i` and `i-3`)
 * is sufficient.
 *
 * This optimization can be applied to all of the solutions.
 */
export const part2WindowFoldNoSum = (input: number[]): number => {
  if (input.length < 4) {
    return 0;
  }
  const increments = input.windowFoldLeft(
    3,
    { increments: 0, prev: 0 },
    (acc, slice) => {
      const { increments, prev } = acc;
      const newVal = slice[2];
      return {
        increments: newVal > prev ? increments + 1 : increments,
        prev: slice[0],
      };
    }
  );
  // need to subtract 1 because the first window will
  // always be higher than the initial accumulator value of zero.
  return increments.increments - 1;
};
