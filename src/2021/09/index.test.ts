import { part1 } from ".";
import { lineReader } from "../../types";
const demoInput = `2199943210
3987894921
9856789892
8767896789
9899965678`.split("\n");

const inputData = lineReader(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/day9.txt",
  (line) => line
);
const input = test("part 1 demo", () => {
  expect(part1(demoInput)).toBe(15);
});
