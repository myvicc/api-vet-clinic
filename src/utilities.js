export const passwordIsCorrect = (password) => {
  const regex = new RegExp(/^(?=.*[A-Z])(?=.*[?!%@#$^&*])(?=.*[0-9]){8,}$/gi);
  return regex.test(password);
};
