const { part2, part2Sliding } = require("./part2");
import { expected, inputData } from ".";

test("runs part 2 demo code", () => {
  const demo = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  expect(part2(demo)).toBe(expected.partTwoDemo);
});

test("runs part 2", () => {
  expect(part2(inputData)).toBe(expected.partTwo);
});

test("runs part 2 using the sliding apply", () => {
  expect(part2Sliding(inputData)).toBe(expected.partTwo);
});
