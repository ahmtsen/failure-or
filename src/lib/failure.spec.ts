import test from "ava";

import { Failure } from "./failure";
import { FailureType } from "./failure-type";

const code = "FAILURE_CODE";
const description = "FAILURE_DESCRIPTION";

test("failure", (t) => {
  const failure = Failure.create(code, description);

  t.is(failure.code, code);
  t.is(failure.description, description);
  t.is(failure.type, FailureType.Default);
  t.is(failure.numericType, FailureType.Default.valueOf());
});

test("failure with type unexpected", (t) => {
  const unexpectedFailure = Failure.unexpected(code, description);

  t.is(unexpectedFailure.code, code);
  t.is(unexpectedFailure.description, description);
  t.is(unexpectedFailure.type, FailureType.Unexpected);
  t.is(unexpectedFailure.numericType, FailureType.Unexpected.valueOf());
});

test("failure with type validation", (t) => {
  const validationFailure = Failure.validation(code, description);

  t.is(validationFailure.code, code);
  t.is(validationFailure.description, description);
  t.is(validationFailure.type, FailureType.Validation);
  t.is(validationFailure.numericType, FailureType.Validation.valueOf());
});

test("failure with type conflict", (t) => {
  const conflictFailure = Failure.conflict(code, description);

  t.is(conflictFailure.code, code);
  t.is(conflictFailure.description, description);
  t.is(conflictFailure.type, FailureType.Conflict);
  t.is(conflictFailure.numericType, FailureType.Conflict.valueOf());
});

test("failure with type not found", (t) => {
  const notFoundFailure = Failure.notFound(code, description);

  t.is(notFoundFailure.code, code);
  t.is(notFoundFailure.description, description);
  t.is(notFoundFailure.type, FailureType.NotFound);
  t.is(notFoundFailure.numericType, FailureType.NotFound.valueOf());
});

test("failure with type unauthorized", (t) => {
  const unauthorizedFailure = Failure.unauthorized(code, description);

  t.is(unauthorizedFailure.code, code);
  t.is(unauthorizedFailure.description, description);
  t.is(unauthorizedFailure.type, FailureType.Unauthorized);
  t.is(unauthorizedFailure.numericType, FailureType.Unauthorized.valueOf());
});

test("failure with custom type", (t) => {
  const customType = 1234;
  const customFailure = Failure.custom(code, description, customType);

  t.is(customFailure.code, code);
  t.is(customFailure.description, description);
  t.is(customFailure.type, customType);
  t.is(customFailure.numericType, customType);
});

test("failure from error", (t) => {
  const error = new Error("ERROR_MESSAGE");
  const failure = Failure.fromError(error);

  t.is(failure.code, error.name);
  t.is(failure.description, error.message);
  t.is(failure.type, FailureType.Unexpected);
  t.is(failure.numericType, FailureType.Unexpected.valueOf());
});

test("failure with default parameters", (t) => {
  const failure = Failure.create();

  t.is(failure.code, "General.Failure");
  t.is(failure.description, "A failure has occurred.");
  t.is(failure.type, FailureType.Default);
  t.is(failure.numericType, FailureType.Default.valueOf());
});

test("failure with type unexpected and default parameters", (t) => {
  const failure = Failure.unexpected();

  t.is(failure.code, "General.Unexpected");
  t.is(failure.description, "An unexpected failure has occurred.");
  t.is(failure.type, FailureType.Unexpected);
  t.is(failure.numericType, FailureType.Unexpected.valueOf());
});

test("failure with type validation and default parameters", (t) => {
  const failure = Failure.validation();

  t.is(failure.code, "General.Validation");
  t.is(failure.description, "A validation failure has occurred.");
  t.is(failure.type, FailureType.Validation);
  t.is(failure.numericType, FailureType.Validation.valueOf());
});

test("failure with type conflict and default parameters", (t) => {
  const failure = Failure.conflict();

  t.is(failure.code, "General.Conflict");
  t.is(failure.description, "A conflict has occurred.");
  t.is(failure.type, FailureType.Conflict);
  t.is(failure.numericType, FailureType.Conflict.valueOf());
});

test("failure with type not found and default parameters", (t) => {
  const failure = Failure.notFound();

  t.is(failure.code, "General.NotFound");
  t.is(failure.description, "A 'Not Found' failure has occurred.");
  t.is(failure.type, FailureType.NotFound);
  t.is(failure.numericType, FailureType.NotFound.valueOf());
});

test("failure with type unauthorized and default parameters", (t) => {
  const failure = Failure.unauthorized();

  t.is(failure.code, "General.Unauthorized");
  t.is(failure.description, "An 'Unauthorized' failure has occurred.");
  t.is(failure.type, FailureType.Unauthorized);
  t.is(failure.numericType, FailureType.Unauthorized.valueOf());
});
