/**
 * LLD: Result Object Pattern
 * Prevents throwing errors and forces explicit error handling.
 */
export class Result<T, E = Error> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {
    Object.freeze(this);
  }

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public getValue(): T {
    if (!this._isSuccess) {
      throw new Error("Cannot get value from a failure result. Check isSuccess() first.");
    }
    return this._value as T;
  }

  public getError(): E {
    if (this._isSuccess) {
      throw new Error("Cannot get error from a success result. Check isFailure() first.");
    }
    return this._error as E;
  }

  public static ok<T, E>(value?: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  public static fail<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }
}
