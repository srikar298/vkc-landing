/**
 * Identity & Auth Enums
 */
export enum IdentityProvider {
  PHONE = "PHONE",
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  APPLE = "APPLE",
}

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  EXPERT = "EXPERT",
  MEMBER_VERIFIED = "MEMBER_VERIFIED",
  MEMBER_BASIC = "MEMBER_BASIC",
  GUEST = "GUEST",
}

/**
 * Verification Status
 */
export enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
}
