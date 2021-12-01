export const foldLeft =
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
