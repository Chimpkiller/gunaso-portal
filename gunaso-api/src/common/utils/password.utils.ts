export async function hashPassword (password: string) : Promise<string> {
  const hash = await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 19456,
    timeCost: 3,
  });

  return hash;
}
