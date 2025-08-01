export const jwtConstants = {
  get secret() {
    return process.env.JWT_SECRET;
  },
};
