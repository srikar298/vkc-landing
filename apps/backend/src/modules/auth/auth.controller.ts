import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { 
  requestOtpSchema, 
  verifyOtpSchema, 
  refreshTokenSchema, 
  registerUserSchema,
  AuthRateLimit,
  BaseDomainError,
  DynamicDomainError,
  logger
} from "@vishwakarma-k-c/shared";
import { RequestOtpUseCase } from "./application/use-cases/request-otp.use-case";
import { VerifyOtpUseCase } from "./application/use-cases/verify-otp.use-case";
import { RefreshTokenUseCase } from "./application/use-cases/refresh-token.use-case";
import { RegisterUserUseCase } from "./application/use-cases/register-user.use-case";
import { AuthPresentationMapper } from "./presentation/mappers/auth-presentation.mapper";

/**
 * LLD: Auth Controller
 * Handles HTTP request/response and delegates to Use Cases.
 */
export class AuthController {
  constructor(
    private readonly requestOtpUseCase: RequestOtpUseCase,
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase
  ) {}

  /**
   * Fastify Route Registration
   * Implements Granular Rate Limiting & Enterprise Idempotency
   */
  public async routes(fastify: FastifyInstance) {
    fastify.post("/otp/request", {
      config: { rateLimit: AuthRateLimit, idempotency: true }
    }, this.requestOtp.bind(this));

    fastify.post("/otp/verify", {
      config: { rateLimit: AuthRateLimit }
    }, this.verifyOtp.bind(this));

    fastify.post("/refresh", this.refreshToken.bind(this));

    fastify.post("/register", {
      config: { rateLimit: AuthRateLimit, idempotency: true }
    }, this.registerUser.bind(this));
  }

  private async requestOtp(request: FastifyRequest, reply: FastifyReply) {
    const input = requestOtpSchema.parse(request.body);
    const result = await this.requestOtpUseCase.execute(input);

    if (result.isFailure) {
      return this.handleError(reply, result.getError());
    }

    return reply.status(200).send({ 
      success: true, 
      message: "OTP sent successfully",
      // Enterprise Tip: In development, you might expose the OTP here if needed for testing
    });
  }

  private async verifyOtp(request: FastifyRequest, reply: FastifyReply) {
    const input = verifyOtpSchema.parse(request.body);
    const result = await this.verifyOtpUseCase.execute(input);

    if (result.isFailure) {
      return this.handleError(reply, result.getError());
    }

    const data = result.getValue();

    // If registration is required, we return a 200 but with a specific state
    if ('registerRequired' in data) {
      return reply.status(200).send({
        success: true,
        registerRequired: true,
        identifier: data.identifier
      });
    }

    return reply.status(200).send({
      success: true,
      tokens: data
    });
  }

  private async refreshToken(request: FastifyRequest, reply: FastifyReply) {
    const input = refreshTokenSchema.parse(request.body);
    const result = await this.refreshTokenUseCase.execute(input);

    if (result.isFailure) {
      return this.handleError(reply, result.getError());
    }

    return reply.status(200).send({
      success: true,
      tokens: result.getValue()
    });
  }

  private async registerUser(request: FastifyRequest, reply: FastifyReply) {
    const input = registerUserSchema.parse(request.body);
    const result = await this.registerUserUseCase.execute(input);

    if (result.isFailure) {
      return this.handleError(reply, result.getError());
    }

    return reply.status(200).send({ 
      success: true, 
      user: AuthPresentationMapper.toUserResponse(result.getValue()) 
    });
  }

  /**
   * Global Module Error Handler
   */
  private handleError(reply: FastifyReply, error: Error) {
    logger.error({ error: error.message, stack: error.stack }, "Auth Module Error");

    if (error instanceof BaseDomainError) {
      const statusCodeMap: Record<string, number> = {
        "NOT_FOUND": 404,
        "CONFLICT": 409,
        "UNAUTHORIZED": 401,
        "INVALID_OTP": 400,
        "EXPIRED_OTP": 400,
        "TOO_MANY_ATTEMPTS": 429,
        "TOO_MANY_REQUESTS": 429,
        "USER_NOT_FOUND": 404
      };

      const status = statusCodeMap[error.code] || 400;
      return reply.status(status).send({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          metadata: error.metadata
        }
      });
    }

    // Fallback for unexpected errors
    return reply.status(500).send({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred"
      }
    });
  }
}
