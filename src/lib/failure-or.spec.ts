import test from 'ava';

import { Failure } from './failure';
import { fail, ok } from './failure-or.factory';

test('switch executes onValue when success', (t) => {
  const errorOrValue = ok('value');
  const onValue = (value: string) => t.is(value, errorOrValue.value);
  const onFailure = () => {
    throw new Error('Should not be called');
  };

  t.notThrows(() => errorOrValue.switch(onValue, onFailure));
});

test('switch executes onFailure when failure', (t) => {
  const failure = Failure.create();
  const errorOrValue = fail(failure);
  const onValue = () => {
    throw new Error('Should not be called');
  };
  const onFailure = (failures: Array<Failure>) => t.is(failures[0], failure);

  t.notThrows(() => errorOrValue.switch(onValue, onFailure));
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
