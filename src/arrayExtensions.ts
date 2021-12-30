export {};
declare global {
  interface Array<T> {
    sliding(windowSize: number): Array<T[]>;
    slidingApply<U>(windowSize: number, fn: (slice: T[]) => U): Array<U>;
    foldLeft<U>(fn: (acc: U, newValue: T) => U, zero: U): U;
    windowFoldLeft<U>(
      windowSize: number,
      zero: U,
      fn: (acc: U, slice: T[]) => U
    ): U;
  }

  interface Map<K, V> {
    getOrElse(k: K, v: V): V;
  }
  interface Set<T> {
    intersection(s2: Set<T>): Set<T>;
  }
}
Map.prototype.getOrElse = function <K, V>(k: K, v: V): V {
  if (this.get(k) !== undefined) {
    return this.get(k);
  }
  return v;
};

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

Array.prototype.foldLeft = function <T, U>(
  fn: (acc: U, newValue: T) => U,
  zero: U
): U {
  // Prototype methods can't be called recursively, so we put the fold inside here.
  const foldLeft =
    <A, B>(xs: Array<A>, zero: B) =>
    (f: (b: B, a: A) => B): B => {
      const len = xs.length;
      if (len === 0) return zero;
      else {
        const head = xs[0];
        const tails = xs.slice(1);
        return foldLeft(tails, f(zero, head))(f);
      }
    };
  return foldLeft(this, zero)(fn);
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
