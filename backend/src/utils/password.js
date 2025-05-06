import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function doesPasswordsMatch(data, encrypted) {
  const result = await bcrypt.compare(data, encrypted);
  return result;
}

export async function hashPassword(password) {
  await bcrypt.hash(password, SALT_ROUNDS);
}
