export {};
declare global {
  interface Array<T> {
    sliding(windowSize: number): Array<T[]>;
    slidingApply<U>(windowSize: number, fn: (slice: T[]) => U): Array<U>;
    windowFoldLeft<U>(
      windowSize: number,
      zero: U,
      fn: (acc: U, slice: T[]) => U
    ): U;
  }
}

Array.prototype.sliding = function <T>(windowSize: number) {
  let slices: T[][] = [];
  for (let i = windowSize; i <= this.length; i++) {
    slices.push(this.slice(i - windowSize, i));
  }
  return slices;
};

Array.prototype.slidingApply = function <T, U>(
  windowSize: number,
  fn: (slice: T[]) => U
): U[] {
  let slices: U[] = [];
  for (let i = windowSize; i <= this.length; i++) {
    slices.push(fn(this.slice(i - windowSize, i)));
  }
  return slices;
};

Array.prototype.windowFoldLeft = function <T, U>(
  windowSize: number,
  accumulator: U,
  fn: (acc: U, slice: T[]) => U
): U {
  for (let i = windowSize; i <= this.length; i++) {
    const newSlice = this.slice(i - windowSize, i);
    accumulator = fn(accumulator, newSlice);
  }
  return accumulator;
};
