import { inputData } from "../../2020/01";
import { part1 } from "./part1";
import { part2, part2Sliding, part2WindowFoldNoSum } from "./part2";

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
