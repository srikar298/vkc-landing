/**
 * LLD: Domain Error Hierarchy
 */
export abstract class BaseDomainError extends Error {
  public abstract readonly code: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.metadata = metadata;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Shared Global Errors
 */

export class NotFoundError extends BaseDomainError {
  public readonly code = "NOT_FOUND";
}

export class ConflictError extends BaseDomainError {
  public readonly code = "CONFLICT";
}

export class UnauthorizedError extends BaseDomainError {
  public readonly code = "UNAUTHORIZED";
}

export class ValidationError extends BaseDomainError {
  public readonly code = "VALIDATION_ERROR";
}

export class UnexpectedError extends BaseDomainError {
  public readonly code = "UNEXPECTED_ERROR";
}

/**
 * For cases where we have a dynamic code from the backend
 */
export class DynamicDomainError extends BaseDomainError {
  constructor(public readonly code: string, message: string, metadata?: Record<string, unknown>) {
    super(message, metadata);
  }
}
