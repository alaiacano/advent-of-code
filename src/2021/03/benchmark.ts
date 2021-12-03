import { inputData } from ".";
import { part1, part2 } from ".";

/*
part1 x 9,128 ops/sec ±2.09% (82 runs sampled)
part2 x 1,704 ops/sec ±1.26% (86 runs sampled)
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
