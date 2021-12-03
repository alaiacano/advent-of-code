import { lineReader } from "../../types";
import { foldLeft } from "../../functional";

export const inputData = lineReader<string>(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/03/input.txt",
  (l) => l
);

const getOneCounts = (inputs: string[]): number[] => {
  const bits = inputs[0].length;
  let oneCounts: number[] = Array.from({ length: bits }, (x) => 0);

  for (let line of inputs) {
    for (let i = 0; i < bits; i++) {
      if (line[i] === "1") {
        oneCounts[i] += 1;
      }
    }
  }
  return oneCounts;
};

/**
 * Counts how many 1's are in a certain position. "bit zero" is the leftmost!
 */
const countOnesAtPosition = (lines: string[], bit: number): number => {
  let count = 0;
  for (let line of lines) {
    if (line[bit] === "1") count++;
  }
  return count;
};

export const part2 = (inputs: string[]): number => {
  const bits = inputs[0].length;

  let oxygen: string[] = Object.assign([], inputs);
  let co2: string[] = Object.assign([], inputs);

  for (let bit = 0; bit < bits; bit++) {
    if (oxygen.length === 1 && co2.length === 1) {
      break;
    }

    if (oxygen.length > 1) {
      const onesAtPosition = countOnesAtPosition(oxygen, bit);
      const minOnesToKeep = oxygen.length / 2;
      oxygen = oxygen.filter((line) => {
        if (onesAtPosition == minOnesToKeep) {
          return line[bit] === "1";
        }
        return onesAtPosition > minOnesToKeep
          ? line[bit] === "1"
          : line[bit] === "0";
      });
    }

    if (co2.length > 1) {
      const onesAtPosition = countOnesAtPosition(co2, bit);
      const minOnesToKeep = co2.length / 2;
      co2 = co2.filter((line) => {
        if (onesAtPosition == minOnesToKeep) {
          return line[bit] === "0";
        }
        return onesAtPosition < minOnesToKeep
          ? line[bit] === "1"
          : line[bit] === "0";
      });
    }
  }
  const oxygenScore = parseInt(oxygen[0], 2);
  const co2Score = parseInt(co2[0], 2);
  return oxygenScore * co2Score;
};

export const part1 = (inputs: string[]): number => {
  const bits = inputs[0].length;
  const oneCounts = getOneCounts(inputs);
  let gamma = 0,
    epsilon = 0;

  oneCounts.forEach((count, index) => {
    if (count > inputs.length / 2) {
      gamma += 2 ** (bits - index - 1);
    } else {
      epsilon += 2 ** (bits - index - 1);
    }
  });

  return gamma * epsilon;
};
