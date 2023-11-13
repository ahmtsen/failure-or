import { Failure } from './failure';

export interface IFailureOr {
  /**
   * Gets the list of failures
   *
   * @type {Array<Failure>}
   * @memberof IFailureOr
   */
  readonly failures?: Array<Failure>;

  /**
   * Gets a value indicating whether the result is a success
   *
   * @type {boolean}
   * @memberof IFailureOr
   */
  readonly isSuccess: boolean;

  /**
   * Gets a value indicating whether the result is a failure
   *
   * @type {boolean}
   * @memberof IFailureOr
   */
  readonly isFailure: boolean;
}
