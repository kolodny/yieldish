exports.yieldish = function yieldish(fn) {
  const syncFn = fn(true);
  const asyncFn = fn(false);

  return ({

    sync: (...args) => {
      const gen = syncFn(...args);
      let value, done = false;
      while (!done) {
        ({ value, done } = gen.next(value));
      }
      return value;
    },

    async: (...args) => new Promise(function (resolve, reject) {
      var gen = asyncFn(...args);
      next(undefined);

      function next(arg) {
        let value, done;
        try {
          ({ value, done } = gen.next(arg));
        } catch (error) {
          reject(error);
          return;
        }
        if (done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(next, reject);
        }
      }
    }),

  });
}
