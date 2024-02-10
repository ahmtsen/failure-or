import { Failure } from './failure';
import { FailureOr } from './failure-or';

export function ok<TValue>(value: TValue): FailureOr<TValue> {
  return FailureOr.fromValue(value);
}

export function fail<TValue>(
  failure: Failure | Array<Failure>,
): FailureOr<TValue> {
  if (failure instanceof Array) {
    return FailureOr.fromFailures(failure);
  }

  return FailureOr.fromFailure(failure);
}
