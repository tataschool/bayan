
import * as jose from 'jose';
import { User } from '../types';

// NOTE: In a real production environment, this Secret Key MUST be stored on the backend server
// and never exposed to the client. For this frontend-only demo, we simulate the server.
const SECRET_KEY = new TextEncoder().encode('ISTA-TATA-SECURE-KEY-256-BIT-SIGNATURE-MUST-BE-KEPT-SECRET');
const ALG = 'HS256';

export interface JWTPayload extends jose.JWTPayload {
  sub: string;
  role: string;
  name: string;
}

// Server Simulation: Generate signed Access Token (Short-lived: 15m)
export const generateAccessToken = async (user: User): Promise<string> => {
  return await new jose.SignJWT({ 
    role: user.role, 
    name: user.name 
  })
    .setProtectedHeader({ alg: ALG })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('15m') // Short expiration for security
    .sign(SECRET_KEY);
};

// Server Simulation: Generate signed Refresh Token (Long-lived: 7d)
export const generateRefreshToken = async (userId: string): Promise<string> => {
  return await new jose.SignJWT({})
    .setProtectedHeader({ alg: ALG })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
};

// Server Simulation: Verify Token Signature
export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, SECRET_KEY);
    return payload as JWTPayload;
  } catch (error) {
    // console.error("Token verification failed:", error);
    return null;
  }
};

// Helper to verify if user has specific permission based on token
export const checkTokenPermission = async (token: string, allowedRoles: string[]): Promise<boolean> => {
  const payload = await verifyToken(token);
  if (!payload) return false;
  return allowedRoles.includes(payload.role);
};
