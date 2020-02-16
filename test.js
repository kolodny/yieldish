const { yieldish } = require('./');
const assert = require('assert');

describe('yieldish', () => {

  function setup() {
    const soonValue = (value) => new Promise(res => setTimeout(() => res(value), 400));
    const addSomeNumbers = isSync => function *(firstNumber) {
      const secondNumber = yield isSync ? 1 : soonValue(1);
      return firstNumber + secondNumber;
    }

    const { sync, async } = yieldish(addSomeNumbers);
    return { sync, async };
  }

  it('creates a sync and async function', () => {
    const {sync, async} = setup();
    assert(sync);
    assert(async);
  });

  it('has a sync function that returns synchronously', () => {
    const { sync } = setup();
    assert.equal(sync(5), 6);
  });

  it('has an async function that returns asynchronously', (done) => {
    const { async } = setup();
    async(5).then(value => {
      assert.equal(value, 6);
      done();
    });
  });
});
