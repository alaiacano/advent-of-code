import { DayAnswer, lineReader } from "../../types";

export const inputData = lineReader<number>(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/01/input.txt",
  (l: string) => parseInt(l, 10)
);

export const expected: DayAnswer = {
  partOneDemo: 7,
  partOne: 1655,
  partTwoDemo: 5,
  partTwo: 1683,
};
