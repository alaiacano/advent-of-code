import { BinaryTree } from "../../trees";
import { lineReader, DayAnswer } from "../../types";
import { foldLeft } from "../../functional";

export const inputData = lineReader<number>(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2020/01/part1.txt",
  (l: string) => parseInt(l, 10)
);

export const expected: DayAnswer = {
  partOneDemo: 514579,
  partOne: 982464,
  partTwoDemo: 241861950,
  partTwo: 162292410,
};

export const buildTree = (input: number[]): BinaryTree<number> => {
  return foldLeft(
    input,
    new BinaryTree<number>()
  )((t: BinaryTree<number>, item: number) => {
    t.insert(item);
    return t;
  });
};
