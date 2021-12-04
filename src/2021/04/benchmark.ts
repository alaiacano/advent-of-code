import { inputData } from "./parser";
import { part1, part2 } from ".";

/*
part1 x 240,156 ops/sec ±7.04% (70 runs sampled)
part2 x 11,827 ops/sec ±1.54% (80 runs sampled)
*/

let Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

suite
  .add("part1", function () {
    part1(inputData);
  })
  .add("part2", function () {
    part2(inputData);
  })
  // add listeners
  .on("cycle", function (event: any) {
    console.log(String(event.target));
  })
  // run async
  .run({ async: true });
