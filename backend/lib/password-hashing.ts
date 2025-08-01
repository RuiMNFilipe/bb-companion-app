import { hash, compare } from 'bcrypt-ts';

const SALT_ROUNDS = 15 as const;

export async function hashPassword(plainTxtPw: string) {
  return await hash(plainTxtPw, SALT_ROUNDS);
}

export async function validatePassword(plainTxtPw: string, hashedPw: string) {
  return await compare(plainTxtPw, hashedPw);
}
