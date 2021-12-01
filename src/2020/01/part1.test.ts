const { part1 } = require("./part1.ts");
import { expected, inputData } from ".";

test("runs part 1 demo code", () => {
  const demo = [1721, 979, 366, 299, 675, 1456];
  expect(part1(demo)).toBe(expected.partOneDemo);
});

test("runs part 1", () => {
  expect(part1(inputData)).toBe(expected.partOne);
});
