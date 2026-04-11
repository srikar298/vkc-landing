import { z } from "zod";

/**
 * Request OTP Validation
 */
export const requestOtpSchema = z.object({
  identifier: z.string().describe("Phone number or Email address"),
  provider: z.enum(["PHONE", "EMAIL"]).default("PHONE"),
  reason: z.enum(["LOGIN", "REGISTER"]).default("LOGIN"),
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;

/**
 * Verify OTP Validation
 */
export const verifyOtpSchema = z.object({
  identifier: z.string(),
  code: z.string().length(6, "OTP must be 6 digits"),
  provider: z.enum(["PHONE", "EMAIL"]).default("PHONE"),
  reason: z.enum(["LOGIN", "REGISTER"]).default("LOGIN"),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

/**
 * Refresh Token Validation
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

/**
 * Register User (Profile Completion) Validation
 */
export const registerUserSchema = z.object({
  userId: z.string().describe("The user's publicId"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
