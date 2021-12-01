const { part1 } = require("./part1");
import { expected, inputData } from ".";

test("runs part 1 demo code", () => {
  const demo = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  expect(part1(demo)).toBe(expected.partOneDemo);
});

test("runs part 1", () => {
  expect(part1(inputData)).toBe(expected.partOne);
});
