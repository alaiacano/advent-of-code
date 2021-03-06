import { inputData, part1, part2, part2Sliding, part2WindowFoldNoSum } from ".";

let Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

suite
  .add("part1", function () {
    part1(inputData);
  })
  .add("part2", function () {
    part2(inputData);
  })
  .add("part2Sliding", function () {
    part2Sliding(inputData);
  })
  .add("part2WindowFoldNoSum", function () {
    part2WindowFoldNoSum(inputData);
  })

  // add listeners
  .on("cycle", function (event: any) {
    console.log(String(event.target));
  })
  // run async
  .run({ async: true });
