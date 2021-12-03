import { part1, part2, inputData } from ".";

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
