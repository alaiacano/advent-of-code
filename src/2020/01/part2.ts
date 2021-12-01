import { PartAnswer } from "../../types";
import { buildTree } from ".";
import { part1Helper } from "./part1";

export const part2 = (input: number[]): PartAnswer => {
  const tree = buildTree(input);
  for (let index = 0; index < input.length; index++) {
    const restOfProduct = part1Helper(
      tree,
      input.slice(index),
      2020 - input[index]
    );
    if (restOfProduct > -1) {
      return input[index] * restOfProduct;
    }
  }
  return -1;
};
