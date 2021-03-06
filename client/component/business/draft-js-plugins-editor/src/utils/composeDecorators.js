// This code originally has been copied from Recompose
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/compose.js
export default (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const last = funcs[funcs.length - 1];

  return (...args) => {
    let result = last(...args);
    for (let i = funcs.length - 2; i >= 0; i -= 1) {
      const f = funcs[i];
      result = f(result);
    }
    return result;
  };
};
