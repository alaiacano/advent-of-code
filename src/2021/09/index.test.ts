import { part1, part2 } from ".";
import { lineReader } from "../../types";
import * as Collections from "typescript-collections";
const demoInput = `2199943210
3987894921
9856789892
8767896789
9899965678`.split("\n");

const inputData = lineReader(
  "/Users/adam/github/alaiacano/advent-of-code/inputs/2021/day9.txt",
  (line) => line
);
test("part 1 demo", () => {
  expect(part1(demoInput)).toBe(15);
});

test("part 1", () => {
  expect(part1(inputData)).toBe(468);
});

// It turns out Set<object> doesn't really work in typescript! typescript-collections is a bit of a work-around. This test ensures it works.
type Cell = {
  row: number;
  col: number;
  value: number;
};

test("set inclusion works", () => {
  const cells = new Collections.Set<Cell>((item) => JSON.stringify(item));
  cells.add({ row: 1, col: 1, value: 3 });
  expect(cells.size()).toBe(1);
  // add an element
  cells.add({ row: 2, col: 2, value: 2 });
  expect(cells.size()).toBe(2);
  // add a duplicate element
  cells.add({ row: 2, col: 2, value: 2 });
  expect(cells.size()).toBe(2);
});

test("part 2 demo", () => {
  expect(part2(demoInput)).toBe(1134);
});

test("part 2", () => {
  expect(part2(inputData)).toBe(1280496);
});
