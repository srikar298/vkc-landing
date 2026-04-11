import * as jose from 'jose';
import { config } from '../config';

// Define the shape of our JWT Payload
export interface JWTPayload {
  id: string; // The user's publicId or internal ID
  role: string;
}

export class JWTService {
  private static readonly secret = new TextEncoder().encode(config.auth.jwtSecret);

  /**
   * Signs a short-lived Access Token
   */
  static async signAccessToken(payload: JWTPayload): Promise<string> {
    return new jose.SignJWT({ ...payload, type: 'access' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(config.auth.jwtExpiresIn) // e.g. '15m'
      .sign(this.secret);
  }

  /**
   * Signs a long-lived Refresh Token
   */
  static async signRefreshToken(payload: { id: string }): Promise<string> {
    return new jose.SignJWT({ id: payload.id, type: 'refresh' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // Refresh tokens typically last much longer
      .setJti(crypto.randomUUID()) // Unique identifier for rotation detection
      .sign(this.secret);
  }

  /**
   * Verifies a JWT and returns the payload
   */
  static async verifyToken(token: string): Promise<(JWTPayload & { type: string; jti?: string }) | null> {
    try {
      const { payload } = await jose.jwtVerify(token, this.secret, {
        algorithms: ['HS256'],
      });
      return payload as unknown as (JWTPayload & { type: string; jti?: string });
    } catch (error) {
      return null;
    }
  }
}
