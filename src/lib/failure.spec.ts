import test from 'ava';

import { Failure } from './failure';
import { FailureTypes } from './failure-type';

const code = 'FAILURE_CODE';
const description = 'FAILURE_DESCRIPTION';

test('failure', (t) => {
  const failure = Failure.create(code, description);

  t.is(failure.code, code);
  t.is(failure.description, description);
  t.is(failure.type, FailureTypes.Default);
});

test('failure with type unexpected', (t) => {
  const unexpectedFailure = Failure.unexpected(code, description);

  t.is(unexpectedFailure.code, code);
  t.is(unexpectedFailure.description, description);
  t.is(unexpectedFailure.type, FailureTypes.Unexpected);
});

test('failure with type validation', (t) => {
  const validationFailure = Failure.validation(code, description);

  t.is(validationFailure.code, code);
  t.is(validationFailure.description, description);
  t.is(validationFailure.type, FailureTypes.Validation);
});

test('failure with type conflict', (t) => {
  const conflictFailure = Failure.conflict(code, description);

  t.is(conflictFailure.code, code);
  t.is(conflictFailure.description, description);
  t.is(conflictFailure.type, FailureTypes.Conflict);
});

test('failure with type not found', (t) => {
  const notFoundFailure = Failure.notFound(code, description);

  t.is(notFoundFailure.code, code);
  t.is(notFoundFailure.description, description);
  t.is(notFoundFailure.type, FailureTypes.NotFound);
});

test('failure with type unauthorized', (t) => {
  const unauthorizedFailure = Failure.unauthorized(code, description);

  t.is(unauthorizedFailure.code, code);
  t.is(unauthorizedFailure.description, description);
  t.is(unauthorizedFailure.type, FailureTypes.Unauthorized);
});

test('failure with custom type', (t) => {
  const customType = 'MyCustomFailureType';
  const customFailure = Failure.custom(code, description, customType);

  t.is(customFailure.code, code);
  t.is(customFailure.description, description);
  t.is(customFailure.type, customType);
});

test('failure from error', (t) => {
  const error = new Error('ERROR_MESSAGE');
  const failure = Failure.fromError(error);

  t.is(failure.code, error.name);
  t.is(failure.description, error.message);
  t.is(failure.type, FailureTypes.Unexpected);
});

test('failure with default parameters', (t) => {
  const failure = Failure.create();

  t.is(failure.code, 'General.Failure');
  t.is(failure.description, 'A failure has occurred.');
  t.is(failure.type, FailureTypes.Default);
});

test('failure with type unexpected and default parameters', (t) => {
  const failure = Failure.unexpected();

  t.is(failure.code, 'General.Unexpected');
  t.is(failure.description, 'An unexpected failure has occurred.');
  t.is(failure.type, FailureTypes.Unexpected);
});

test('failure with type validation and default parameters', (t) => {
  const failure = Failure.validation();

  t.is(failure.code, 'General.Validation');
  t.is(failure.description, 'A validation failure has occurred.');
  t.is(failure.type, FailureTypes.Validation);
});

test('failure with type conflict and default parameters', (t) => {
  const failure = Failure.conflict();

  t.is(failure.code, 'General.Conflict');
  t.is(failure.description, 'A conflict has occurred.');
  t.is(failure.type, FailureTypes.Conflict);
});

test('failure with type not found and default parameters', (t) => {
  const failure = Failure.notFound();

  t.is(failure.code, 'General.NotFound');
  t.is(failure.description, "A 'Not Found' failure has occurred.");
  t.is(failure.type, FailureTypes.NotFound);
});

test('failure with type unauthorized and default parameters', (t) => {
  const failure = Failure.unauthorized();

  t.is(failure.code, 'General.Unauthorized');
  t.is(failure.description, "An 'Unauthorized' failure has occurred.");
  t.is(failure.type, FailureTypes.Unauthorized);
});
