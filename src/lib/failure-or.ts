import { Failure } from './failure';
import { IFailureOr } from './failure-or.interface';

/**
 * A discriminated union of either a value or a list of failures
 *
 * @export
 * @class FailureOr
 * @implements {IFailureOr}
 * @template TValue
 */
export class FailureOr<TValue> implements IFailureOr {
  private readonly _value?: TValue;
  private readonly _failures?: Array<Failure>;

  /**
   * Gets a value indicating whether the result is a success
   *
   * @type {boolean}
   * @memberof FailureOr
   */
  public readonly isSuccess: boolean;

  /**
   * Gets a value indicating whether the result is a failure
   *
   * @type {boolean}
   * @memberof FailureOr
   */
  public readonly isFailure: boolean;

  /**
   * Gets the list of failures. If the state is a success, this will return a list with a single failure.
   *
   * @readonly
   * @type {Array<Failure>}
   * @memberof FailureOr
   */
  public get failures(): Array<Failure> {
    if (!this._failures) {
      return [
        Failure.unexpected(
          'FailureOr.NoFailures',
          'Failures cannot be retrieved from a successful FailureOr',
        ),
      ];
    }

    return this._failures;
  }

  /**
   * Gets the list of failures. If the state is a success, this will return an empty list.
   *
   * @readonly
   * @type {Array<Failure>}
   * @memberof FailureOr
   */
  public get failuresOrEmptyList(): Array<Failure> {
    if (!this._failures) {
      return [];
    }

    return this._failures;
  }

  /**
   * Gets the value. If the state is a failure, this will throw an error.
   * @throws {Error} If the state is a failure
   * @readonly
   * @type {TValue}
   * @memberof FailureOr
   */
  public get value(): TValue {
    if (!this.isSuccess) {
      throw new Error('Value cannot be retrieved from a failed FailureOr');
    }

    return this._value as TValue;
  }

  /**
   * Gets the first error. If the state is a success, this will return a failure indicating that no first failure exists.
   *
   * @readonly
   * @type {Failure}
   * @memberof FailureOr
   */
  public get firstFailure(): Failure {
    if (!this.isFailure) {
      return Failure.unexpected(
        'FailureOr.NoFirstFailure',
        'First failure cannot be retrieved from a successful FailureOr',
      );
    }

    return this._failures![0];
  }

  /**
   * Creates an instance of FailureOr.
   * @param {TValue} [value]
   * @param {Array<Failure>} [failures]
   * @memberof FailureOr
   */
  private constructor(
    isSuccess: boolean,
    value?: TValue,
    failures?: Array<Failure>,
  ) {
    this._value = value;
    this._failures = failures;
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
  }

  public static fromValue<TValue>(value: TValue): FailureOr<TValue> {
    return new FailureOr(true, value);
  }

  public static fromFailure<TValue>(failure: Failure): FailureOr<TValue> {
    return new FailureOr<TValue>(false, undefined, [failure]);
  }

  public static fromFailures<TValue>(
    failures: Array<Failure>,
  ): FailureOr<TValue> {
    return new FailureOr<TValue>(false, undefined, failures);
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed.
   * If the state is a failure, the {@link onFailure} callback will be executed.
   *
   * @param {(value: TValue) => void} onValue
   * @param {(failures: Array<Failure>) => void} onFailure
   * @memberof FailureOr
   */
  public switch(
    onValue: (value: TValue) => void,
    onFailure: (failures: Array<Failure>) => void,
  ): void {
    if (this.isSuccess) {
      onValue(this.value);
    } else {
      onFailure(this.failures);
    }
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed.
   * If the state is a failure, the {@link onFailure} callback will be executed.
   *
   * @param {(value: TValue) => Promise<void>} onValue
   * @param {(failures: Array<Failure>) => Promise<void>} onFailure
   * @return {*}  {Promise<void>}
   * @memberof FailureOr
   */
  public switchAsync(
    onValue: (value: TValue) => Promise<void>,
    onFailure: (failures: Array<Failure>) => Promise<void>,
  ): Promise<void> {
    if (this.isSuccess) {
      return onValue(this.value);
    } else {
      return onFailure(this.failures);
    }
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed.
   * If the state is a failure, the {@link onFailure} callback will be executed using the first failure as input.
   *
   * @param {(value: TValue) => void} onValue
   * @param {(failure: Failure) => void} onFailure
   * @memberof FailureOr
   */
  public switchFirst(
    onValue: (value: TValue) => void,
    onFailure: (failure: Failure) => void,
  ): void {
    if (this.isSuccess) {
      onValue(this.value);
    } else {
      onFailure(this.firstFailure);
    }
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed.
   * If the state is a failure, the {@link onFailure} callback will be executed using the first failure as input.
   *
   * @param {(value: TValue) => Promise<void>} onValue
   * @param {(failure: Failure) => Promise<void>} onFailure
   * @return {*}  {Promise<void>}
   * @memberof FailureOr
   */
  public switchFirstAsync(
    onValue: (value: TValue) => Promise<void>,
    onFailure: (failure: Failure) => Promise<void>,
  ): Promise<void> {
    if (this.isSuccess) {
      return onValue(this.value);
    } else {
      return onFailure(this.firstFailure);
    }
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed and its result is returned.
   * If the state is a failure, the {@link onFailure} callback will be executed and its result is returned.
   *
   * @template TResult
   * @param {(value: TValue) => TResult} onValue
   * @param {(failures: Array<Failure>) => TResult} onFailure
   * @return {*}  {TResult}
   * @memberof FailureOr
   */
  public match<TResult>(
    onValue: (value: TValue) => TResult,
    onFailure: (failures: Array<Failure>) => TResult,
  ): TResult {
    if (this.isSuccess) {
      return onValue(this.value);
    } else {
      return onFailure(this.failures);
    }
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed and its result is returned.
   * If the state is a failure, the {@link onFailure} callback will be executed and its result is returned.
   *
   * @template TResult
   * @param {(value: TValue) => Promise<TResult>} onValue
   * @param {(failures: Array<Failure>) => Promise<TResult>} onFailure
   * @return {*}  {Promise<TResult>}
   * @memberof FailureOr
   */
  public matchAsync<TResult>(
    onValue: (value: TValue) => Promise<TResult>,
    onFailure: (failures: Array<Failure>) => Promise<TResult>,
  ): Promise<TResult> {
    if (this.isSuccess) {
      return onValue(this.value);
    } else {
      return onFailure(this.failures);
    }
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed and its result is returned.
   * If the state is a failure, the {@link onFailure} callback will be executed using the first failure as input and its result is returned.
   *
   * @template TResult
   * @param {(value: TValue) => TResult} onValue
   * @param {(failure: Failure) => TResult} onFailure
   * @return {*}  {TResult}
   * @memberof FailureOr
   */
  public matchFirst<TResult>(
    onValue: (value: TValue) => TResult,
    onFailure: (failure: Failure) => TResult,
  ): TResult {
    if (this.isSuccess) {
      return onValue(this.value);
    } else {
      return onFailure(this.firstFailure);
    }
  }

  /**
   * Executes the appropriate callback based on the state of the {@link FailureOr<TValue>}.
   * If the state is a success, the {@link onValue} callback will be executed and its result is returned.
   * If the state is a failure, the {@link onFailure} callback will be executed using the first failure as input and its result is returned.
   *
   * @template TResult
   * @param {(value: TValue) => Promise<TResult>} onValue
   * @param {(failure: Failure) => Promise<TResult>} onFailure
   * @return {*}  {Promise<TResult>}
   * @memberof FailureOr
   */
  public matchFirstAsync<TResult>(
    onValue: (value: TValue) => Promise<TResult>,
    onFailure: (failure: Failure) => Promise<TResult>,
  ): Promise<TResult> {
    if (this.isSuccess) {
      return onValue(this.value);
    } else {
      return onFailure(this.firstFailure);
    }
  }
}
