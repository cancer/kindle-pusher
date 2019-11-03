import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { AuthorizationError } from "../error/authorization";
import { AuthToken } from './auth-token';
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

const error = new AuthorizationError();

export const makeAuthToken = async (idToken: string | null | undefined): Promise<AuthToken> => {
  if (idToken === null || typeof idToken === 'undefined') {
    throw error;
  }

  try {
    const authToken = new AuthToken(await verifyToken(idToken));
    
    if (!authToken.isVerified) {
      throw error;
    }
    
    return authToken;
  } catch (e) {
    throw new AuthorizationError(e.message);
  }
};
