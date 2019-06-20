export function compose(...fns) {
  return function(...args) {
    fns
      .slice(0, fns.length - 1)
      .reduceRight((result, fn) => fn(result), fns[fns.length - 1](...args));
  };
};

export function pipe(...fns) {
  return compose(...fns.reverse());
};
