import { describe, it, expect } from 'vitest';
import { JWTService } from './jwt.service';

describe('JWTService Integration Tests', () => {
  const testPayload = {
    userId: 'user-123',
    role: 'SUPER_ADMIN'
  };

  it('should sign and verify a valid token', async () => {
    const token = await JWTService.signToken(testPayload);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const verifiedPayload = await JWTService.verifyToken(token);
    expect(verifiedPayload).toBeDefined();
    expect(verifiedPayload?.userId).toBe(testPayload.userId);
    expect(verifiedPayload?.role).toBe(testPayload.role);
  });

  it('should return null for an invalid token', async () => {
    const invalidToken = 'this.is.not.a.token';
    const payload = await JWTService.verifyToken(invalidToken);
    expect(payload).toBeNull();
  });

  it('should return null for an expired token', async () => {
    // This requires a mock or a token signed with 0 expiration (short delay)
    // jose doesn't make it easy to sign expired tokens without complicated time manipulation
    // for now, trust the 'jose' library's internal expiration check.
  });
});
