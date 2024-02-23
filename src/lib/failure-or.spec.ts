import test from 'ava';

import { Failure } from './failure';
import { FailureOr } from './failure-or';
import { fail, ok } from './failure-or.factory';

test('switch executes onValue when success', (t) => {
  const failureOrValue = ok('value');
  const onValue = (value: string) => t.is(value, failureOrValue.value);
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  t.notThrows(() => failureOrValue.switch(onValue, onFailure));
});

test('switch executes onFailure when failure', (t) => {
  const failure = Failure.create();
  const failureOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = (failures: Array<Failure>) => t.is(failures[0], failure);

  t.notThrows(() => failureOrValue.switch(onValue, onFailure));
});

test('switchFirst executes onValue when success', (t) => {
  const errorOrValue = ok('value');
  const onValue = (value: string) => t.is(value, errorOrValue.value);
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  t.notThrows(() => errorOrValue.switchFirst(onValue, onFailure));
});

test('switchFirst executes onFailure when failure', (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = (failure: Failure) => t.is(failure, failure);

  t.notThrows(() => errorOrValue.switchFirst(onValue, onFailure));
});

test('switchAsync executes onValue when success', async (t) => {
  const errorOrValue = ok('value');
  const onValue = async (value: string) => {
    await Promise.resolve(t.is(value, errorOrValue.value));
  };
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  await t.notThrowsAsync(errorOrValue.switchAsync(onValue, onFailure));
});

test('switchAsync executes onFailure when failure', async (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = async (failures: Array<Failure>) => {
    await Promise.resolve(t.is(failures[0], failure));
  };

  await t.notThrowsAsync(errorOrValue.switchAsync(onValue, onFailure));
});

test('switchFirstAsync executes onValue when success', async (t) => {
  const errorOrValue = ok('value');
  const onValue = async (value: string) => {
    await Promise.resolve(t.is(value, errorOrValue.value));
  };
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  await t.notThrowsAsync(errorOrValue.switchFirstAsync(onValue, onFailure));
});

test('switchFirstAsync executes onFailure when failure', async (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = async (failure: Failure) => {
    await Promise.resolve(t.is(failure, failure));
  };

  await t.notThrowsAsync(errorOrValue.switchFirstAsync(onValue, onFailure));
});

test('match executes onValue when success', (t) => {
  const errorOrValue = ok('value');
  const onValue = (value: string) => t.is(value, errorOrValue.value);
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  t.notThrows(() => errorOrValue.match(onValue, onFailure));
});

test('match executes onFailure when failure', (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = (failures: Array<Failure>) => t.is(failures[0], failure);

  t.notThrows(() => errorOrValue.match(onValue, onFailure));
});

test('matchFirst executes onValue when success', (t) => {
  const errorOrValue = ok('value');
  const onValue = (value: string) => t.is(value, errorOrValue.value);
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  t.notThrows(() => errorOrValue.matchFirst(onValue, onFailure));
});

test('matchFirst executes onFailure when failure', (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = (failure: Failure) => t.is(failure, failure);

  t.notThrows(() => errorOrValue.matchFirst(onValue, onFailure));
});

test('matchAsync executes onValue when success', async (t) => {
  const errorOrValue = ok('value');
  const onValue = (value: string) =>
    Promise.resolve(t.is(value, errorOrValue.value));
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  await t.notThrowsAsync(errorOrValue.matchAsync(onValue, onFailure));
});

test('matchAsync executes onFailure when failure', async (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = (failures: Array<Failure>) =>
    Promise.resolve(t.is(failures[0], failure));

  await t.notThrowsAsync(errorOrValue.matchAsync(onValue, onFailure));
});

test('matchFirstAsync executes onValue when success', async (t) => {
  const errorOrValue = ok('value');
  const onValue = (value: string) =>
    Promise.resolve(t.is(value, errorOrValue.value));
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  await t.notThrowsAsync(errorOrValue.matchFirstAsync(onValue, onFailure));
});

test('matchFirstAsync executes onFailure when failure', async (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = (failure: Failure) =>
    Promise.resolve(t.is(failure, failure));

  await t.notThrowsAsync(errorOrValue.matchFirstAsync(onValue, onFailure));
});

test('map executes onValue when success', (t) => {
  const errorOrValue = ok('5');

  const result: FailureOr<string> = errorOrValue
    .map((str: string) => ok(parseInt(str, 10)))
    .map((num: number) => ok(num + 5))
    .map((num: number) => ok(num.toString()));

  t.true(result.isSuccess);
  t.assert(result.value === '10');
});

test('map does not execute onValue when failure', (t) => {
  const failure = Failure.notFound();
  const failureOrValue = fail<string>(failure);

  const result = failureOrValue
    .map((value: string) => ok(parseInt(value, 10)))
    .map((value: number) => ok(value + 5))
    .map((value: number) => ok(value.toString()));

  t.true(result.isFailure);
  t.assert(result.firstFailure.code === failure.code);
  t.assert(result.firstFailure.description === failure.description);
  t.assert(result.firstFailure.type === failure.type);
});

test('map breaks chain when onValue results in a failure', (t) => {
  const failure = Failure.unexpected();
  const failureOrValue = ok('5');

  const result = failureOrValue
    .map((value: string) => ok(parseInt(value, 10)))
    .map((value: number) => ok(value + 5))
    .map(() => fail<number>(failure))
    .map((value: number) => ok(value.toString()));

  t.true(result.isFailure);
  t.assert(result.firstFailure.code === failure.code);
  t.assert(result.firstFailure.description === failure.description);
  t.assert(result.firstFailure.type === failure.type);
});

test('else does not execute when success', (t) => {
  const errorOrValue = ok('5');

  const result: FailureOr<string> = errorOrValue
    .map((str: string) => ok(parseInt(str, 10)))
    .map((num: number) => ok(num + 5))
    .map((num: number) => ok(num.toString()))
    .else((failures) => ok(`${failures.length} errors occurred`));

  t.true(result.isSuccess);
  t.assert(result.value === '10');
});

test('else executes when failure and results in a success', (t) => {
  const failure = Failure.notFound();
  const failureOrValue = fail<string>(failure);

  const result = failureOrValue
    .map((value: string) => ok(parseInt(value, 10)))
    .map((value: number) => ok(value + 5))
    .map((value: number) => ok(value.toString()))
    .else((failures) => ok(`${failures.length} errors occurred`));

  t.true(result.isSuccess);
  t.assert(result.value === '1 errors occurred');
});

test('else executes when failure and results in a failure', (t) => {
  const failure = Failure.notFound();
  const failureOrValue = fail<string>(failure);

  const elseFailure = Failure.unexpected();

  const result = failureOrValue
    .map((value: string) => ok(parseInt(value, 10)))
    .map((value: number) => ok(value + 5))
    .map((value: number) => ok(value.toString()))
    .else(() => fail(elseFailure));

  t.true(result.isFailure);
  t.assert(result.firstFailure.code === elseFailure.code);
  t.assert(result.firstFailure.description === elseFailure.description);
  t.assert(result.firstFailure.type === elseFailure.type);
});
