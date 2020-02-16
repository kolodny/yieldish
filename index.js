function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  let value, done;
  try {
    ({ value, done } = gen[key](arg));
  } catch (error) {
    reject(error);
    return;
  }
  if (done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function createSyncAndAsyncFunction(fn) {
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
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    }),

  });
}

debugger;
const things = createSyncAndAsyncFunction(isSync => function *(third){
  const firstNumber = 1;
  const secondNumber = yield isSync ? 3 : Promise.resolve(3);
  return firstNumber + secondNumber + third
});

(async () => {
  console.log(things.sync(20))
  console.log(await things.async(10))
})();
