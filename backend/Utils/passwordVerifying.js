import bcrypt from 'bcrypt';

export const verifyPassword = async (pass, hash) => {
  const result = await bcrypt.compare(pass, hash);
  return result;
};
