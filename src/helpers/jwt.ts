import {
  SignOptions,
  decode as decoder,
  sign as generator,
  verify as verifier,
} from 'jsonwebtoken';

import { JWT_SEED as SECRET } from '@Helpers/secrets';

// [ ] validate if secret is not loaded in system
/**
 * It takes a payload and options as arguments, and returns a promise that resolves to a JWT token
 * @param payload - The data you want to sign.
 * @param [options] - JWT options
 * @returns A promise that resolves to a token.
 */
export function generate(payload: any, options: SignOptions) {
  return new Promise((resolve, reject) => {
    generator(
      payload,
      SECRET as string,
      {
        expiresIn: '2h',
        ...options,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

/**
 * It takes a token, verifies it, and returns a promise that resolves to the decoded token if the token
 * is valid, or rejects with an error if the token is invalid.
 * @param token - The token to verify.
 * @returns A promise that resolves to the decoded token.
 */
export function decode<T>(token: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    const decoded = decoder(token);

    if (!decoded) {
      reject(new Error('Couldnt return payload'));
      return;
    }

    resolve(decoded as T);
  });
}

/**
 * It takes a JWT token and returns a promise that resolves to the decoded token or rejects with an
 * error
 * @param token - The token to be verified.
 */
export function verify(token: string) {
  return new Promise((resolve, reject) => {
    if (!SECRET) {
      reject(new Error('must provide a secret key'));
      return;
    }

    verifier(token, SECRET, (err:any, decoded:any) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(decoded);
    });
  });
}

/**
 * It checks if the token is expired by comparing the current time to the expiration time of the token
 * @param decoded - The decoded token.
 * @returns The decoded token.
 */
export const isExpiredToken = (decoded: any) => {
  if (!decoded) {
    return null;
  }

  const currentTime = Date.now() / 1000;

  return decoded.exp < currentTime;
};
