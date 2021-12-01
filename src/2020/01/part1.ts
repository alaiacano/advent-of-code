import { PartAnswer } from "../../types";
import { BinaryTree } from "../../trees";
import { foldLeft } from "../../functional";

export const part1 = (input: number[]): PartAnswer => {
  const tree = foldLeft(
    input,
    new BinaryTree<number>()
  )((t: BinaryTree<number>, item: number) => {
    t.insert(item);
    return t;
  });

  for (let item of input) {
    if (tree.contains(2020 - item)) {
      return item * (2020 - item);
    }
  }
  return -1;
};
