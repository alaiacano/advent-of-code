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

  interface Set<T> {
    intersection(s2: Set<T>): Set<T>;
  }
}

Set.prototype.intersection = function <T>(s2: Set<T>) {
  let shorter: Set<T>, longer: Set<T>;
  if (this.size < s2.size) {
    shorter = this;
    longer = s2;
  } else {
    shorter = s2;
    longer = this;
  }
  return new Set([...shorter].filter((x) => longer.has(x)));
};

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
