import { PartAnswer } from "../../types";
import { buildTree } from ".";
import { BinaryTree } from "../../trees";

export const part1Helper = (
  tree: BinaryTree<number>,
  items: number[],
  sumTo: number
): number => {
  for (let item of items) {
    if (tree.contains(sumTo - item)) {
      return item * (sumTo - item);
    }
  }
  return -1;
};

export const part1 = (input: number[]): PartAnswer => {
  const tree = buildTree(input);
  return part1Helper(tree, input, 2020);
};
