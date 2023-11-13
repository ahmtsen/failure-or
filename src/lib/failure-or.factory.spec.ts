import test from 'ava';

import { Failure } from './failure';
import { fail, ok } from './failure-or.factory';
import { FailureType } from './failure-type';
import { Result } from './result';

type Person = {
  name: string;
  surname: string;
};

test('ok', (t) => {
  const person: Person = {
    name: 'John',
    surname: 'Doe',
  };

  const failureOrPerson = ok(person);

  t.true(failureOrPerson.isSuccess);
  t.false(failureOrPerson.isFailure);
  t.is(failureOrPerson.value, person);
});

test('ok with undefined', (t) => {
  const failureOrValue = ok(undefined);

  t.true(failureOrValue.isSuccess);
  t.false(failureOrValue.isFailure);
  t.is(failureOrValue.value, undefined);
});

test('ok with result', (t) => {
  const failureOrSuccess = ok(Result.success);

  t.true(failureOrSuccess.isSuccess);
  t.false(failureOrSuccess.isFailure);
  t.is(failureOrSuccess.value, Result.success);
});

test('accessing failures when success', (t) => {
  const value = ['value'];

  const failureOrValue = ok(value);

  t.is(failureOrValue.failures.length, 1);
  t.is(failureOrValue.failures[0].type, FailureType.Unexpected);
  t.is(failureOrValue.failures[0].code, 'FailureOr.NoFailures');
});

test('accessing failuresOrEmptyList when success', (t) => {
  const value = ['value'];

  const failureOrValue = ok(value);

  t.is(failureOrValue.failuresOrEmptyList.length, 0);
});

test('accessing firstFailure when success', (t) => {
  const value = ['value'];

  const failureOrValue = ok(value);

  t.is(failureOrValue.firstFailure.type, FailureType.Unexpected);
  t.is(failureOrValue.firstFailure.code, 'FailureOr.NoFirstFailure');
});

test('fail', (t) => {
  const failure = Failure.create();

  const failureOrPerson = fail<Person>(failure);

  t.true(failureOrPerson.isFailure);
  t.false(failureOrPerson.isSuccess);
  t.throws(() => failureOrPerson.value);
});

test('fail with list', (t) => {
  const failures = [Failure.unexpected(), Failure.notFound()];

  const failureOrPerson = fail<Person>(failures);

  t.true(failureOrPerson.isFailure);
  t.false(failureOrPerson.isSuccess);
  t.throws(() => failureOrPerson.value);
});

test('accessing failures when failure', (t) => {
  const failure = Failure.create();

  const failureOrPerson = fail<Person>(failure);

  t.is(failureOrPerson.failures.length, 1);
  t.is(failureOrPerson.failures[0], failure);
});

test('accessing failures when failure with list', (t) => {
  const failures = [Failure.unexpected(), Failure.notFound()];

  const failureOrPerson = fail<Person>(failures);

  t.is(failureOrPerson.failures.length, 2);
  t.is(failureOrPerson.failures[0], failures[0]);
  t.is(failureOrPerson.failures[1], failures[1]);
});

test('accessing failuresOrEmptyList when failure', (t) => {
  const failure = Failure.create();

  const failureOrPerson = fail<Person>(failure);

  t.is(failureOrPerson.failuresOrEmptyList.length, 1);
  t.is(failureOrPerson.failuresOrEmptyList[0], failure);
});

test('accessing failuresOrEmptyList when failure with list', (t) => {
  const failures = [Failure.unexpected(), Failure.notFound()];

  const failureOrPerson = fail<Person>(failures);

  t.is(failureOrPerson.failuresOrEmptyList.length, 2);
  t.is(failureOrPerson.failuresOrEmptyList[0], failures[0]);
  t.is(failureOrPerson.failuresOrEmptyList[1], failures[1]);
});

test('accessing firstFailure when failure', (t) => {
  const failure = Failure.create();

  const failureOrPerson = fail<Person>(failure);

  t.is(failureOrPerson.firstFailure, failure);
});

test('accessing firstFailure when failure with list', (t) => {
  const failures = [Failure.unexpected(), Failure.notFound()];

  const failureOrPerson = fail<Person>(failures);

  t.is(failureOrPerson.firstFailure, failures[0]);
});
