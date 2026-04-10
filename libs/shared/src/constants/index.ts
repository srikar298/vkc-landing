// Best Practice: Shared domain constants
export const APP_NAME = 'Vishwakarma Knowledge Centre';
export const API_VERSION = 'v1';

export const ROLES = {
  GUEST: 'GUEST',
  MEMBER: 'MEMBER_BASIC',
  VERIFIED: 'MEMBER_VERIFIED',
  EXPERT: 'EXPERT',
  MODERATOR: 'MODERATOR',
  ADMIN: 'SUPER_ADMIN',
} as const;
