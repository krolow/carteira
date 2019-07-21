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

export function debounce(func, wait) {
  let timeout;

  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  }
};
