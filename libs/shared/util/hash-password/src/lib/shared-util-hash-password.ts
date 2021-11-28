import SHA256 from 'crypto-js/sha256';

export const HashPasswordUtil = {
  hashPassword: async (password) => {
    return await SHA256(password);
  }
}