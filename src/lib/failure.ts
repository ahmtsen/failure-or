import { FailureType, FailureTypes } from './failure-type';

/**
 * Represents a failure.
 *
 * @export
 * @class Failure
 */
export class Failure {
  /**
   * Gets the unique failure code
   *
   * @type {string}
   * @memberof Failure
   */
  public readonly code: string;

  /**
   * Gets the failure description
   *
   * @type {string}
   * @memberof Failure
   */
  public readonly description: string;

  /**
   * Gets the failure type
   *
   * @type {FailureType | string}
   * @memberof Failure
   */
  public readonly type: FailureType | string;

  /**
   * Creates an instance of Failure.
   * @param {string} code
   * @param {string} description
   * @param {FailureType | string} type
   * @memberof Failure
   */
  private constructor(
    code: string,
    description: string,
    type: FailureType | string
  ) {
    this.code = code;
    this.description = description;
    this.type = type;
  }

  /**
   * Creates a new instance of {@link Failure} with type {@link FailureTypes.Default} from a code and description.
   *
   * @static
   * @param {string} [code="General.Failure"]
   * @param {string} [description="A failure has occurred."]
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static create(
    code = 'General.Failure',
    description = 'A failure has occurred.'
  ): Failure {
    return new Failure(code, description, FailureTypes.Default);
  }

  /**
   * Creates a new instance of {@link Failure} with type {@link FailureTypes.Unexpected} from a code and description.
   *
   * @static
   * @param {string} [code="General.Unexpected"]
   * @param {string} [description="An unexpected failure has occurred."]
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static unexpected(
    code = 'General.Unexpected',
    description = 'An unexpected failure has occurred.'
  ): Failure {
    return new Failure(code, description, FailureTypes.Unexpected);
  }

  /**
   * Creates a new instance of {@link Failure} with type {@link FailureTypes.Conflict} from a code and description.
   *
   * @static
   * @param {string} [code='General.Validation']
   * @param {string} [description='A validation failure has occurred.']
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static validation(
    code = 'General.Validation',
    description = 'A validation failure has occurred.'
  ): Failure {
    return new Failure(code, description, FailureTypes.Validation);
  }

  /**
   * Creates a new instance of {@link Failure} with type {@link FailureTypes.Conflict} from a code and description.
   *
   * @static
   * @param {string} [code='General.Conflict']
   * @param {string} [description='A conflict has occurred.']
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static conflict(
    code = 'General.Conflict',
    description = 'A conflict has occurred.'
  ): Failure {
    return new Failure(code, description, FailureTypes.Conflict);
  }

  /**
   * Creates a new instance of {@link Failure} with type {@link FailureTypes.NotFound} from a code and description.
   *
   * @static
   * @param {string} [code='General.NotFound']
   * @param {string} [description="A 'Not Found' failure has occurred."]
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static notFound(
    code: string = 'General.NotFound',
    description: string = "A 'Not Found' failure has occurred."
  ): Failure {
    return new Failure(code, description, FailureTypes.NotFound);
  }

  /**
   * Creates a new instance of {@link Failure} with type {@link FailureTypes.Unauthorized} from a code and description.
   *
   * @static
   * @param {string} [code='General.Unauthorized']
   * @param {string} [description="An 'Unauthorized' failure has occurred."]
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static unauthorized(
    code: string = 'General.Unauthorized',
    description: string = "An 'Unauthorized' failure has occurred."
  ): Failure {
    return new Failure(code, description, FailureTypes.Unauthorized);
  }

  /**
   * Creates a new instance of {@link Failure} from an error.
   *
   * @static
   * @param {Error} error
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static fromError(error: Error): Failure {
    return Failure.unexpected(error.name, error.message);
  }

  /**
   * Creates a new instance of {@link Failure} from a custom code, description, and type.
   *
   * @static
   * @param {string} code
   * @param {string} description
   * @param {string} type
   * @return {*}  {Failure}
   * @memberof Failure
   */
  public static custom(
    code: string,
    description: string,
    type: string
  ): Failure {
    return new Failure(code, description, type);
  }
}
