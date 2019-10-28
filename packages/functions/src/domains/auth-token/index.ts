import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { AuthToken } from './auth-token';
import { AuthTokenUnspecified } from './auth-token-unspecified';
import { InvalidAuthtoken } from './invalid-auth-token';
import jwksRsa from 'jwks-rsa';

dotenv.config();

if (typeof process.env.AUTH0_DOMAIN === 'undefined') {
  throw new Error('Missing AUTH0_DOMAIN.');
}

if (typeof process.env.AUTH0_JWKS_URI === 'undefined') {
  throw new Error('Missing AUTH0_JWKS_URI.');
}

const issuer = `https://${process.env.AUTH0_DOMAIN}/`;

const client = jwksRsa({
  jwksUri: process.env.AUTH0_JWKS_URI
});

const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err: any, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

const verifyToken = (idToken: string): Promise<object | string> => {
  return new Promise((resolve, reject) => {
    verify(idToken, getKey, { algorithms: ['RS256'], issuer }, (err, decoded) => {
      if (!!err) {
        reject(err);
        return;
      }
      
      resolve(decoded);
    })
  });
};

export const makeAuthToken = async (idToken: string | null): Promise<AuthToken> => {
  if (idToken === null) {
    return new AuthTokenUnspecified();
  }

  try {
    const payload = await verifyToken(idToken);
    return new AuthToken(payload);
  } catch (e) {
    return new InvalidAuthtoken(e);
  }
};
