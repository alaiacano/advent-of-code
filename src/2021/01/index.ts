import { part1 } from "./part1";
import { DayAnswer } from "../../types";

const runner = (arg1: string): DayAnswer => {
  return {
    partOne: part1(arg1),
  };
};

export default runner;
