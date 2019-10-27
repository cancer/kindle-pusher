import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { AuthToken } from './auth-token';
import { AuthTokenUnspecified } from './auth-token-unspecified';
import { InvalidAuthtoken } from './invalid-auth-token';

dotenv.config();

if (typeof process.env.AUTH0_CLIENT_SECRET === 'undefined') {
  throw new Error('Missing AUTH0_CLIENT_SECRET.');
}

if (typeof process.env.AUTH0_DOMAIN === 'undefined') {
  throw new Error('Missingに AUTH0_DOMAIN.');
}

const clientSecret = process.env.AUTH0_CLIENT_SECRET;
const issuer = `https://${process.env.AUTH0_DOMAIN}/`;

export const makeAuthToken = (idToken: string | null): AuthToken => {
  if (idToken === null) {
    return new AuthTokenUnspecified();
  }

  try {
    const payload = verify(idToken, clientSecret, { issuer });
    return new AuthToken(payload);
  } catch (e) {
    return new InvalidAuthtoken(e);
  }
};
