const { part2 } = require("./part2.ts");
import { expected, inputData } from ".";
import { lineReader } from "../../types";

test("runs part 2 demo code", () => {
  const demo = [1721, 979, 366, 299, 675, 1456];
  expect(part2(demo)).toBe(expected.partTwoDemo);
});

// test("runs part 2", () => {
//   expect(part2(inputData)).toBe(expected.partTwoDemo);
// });
