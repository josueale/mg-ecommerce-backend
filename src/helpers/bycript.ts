import { genSalt, hash } from 'bcryptjs';

/**
 * It takes a string, generates a salt, and then hashes the string with the salt
 * @param toHash - The string to be hashed
 */
export async function asyncHashString(toHash: string) {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(toHash, salt);

    return hashed;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
