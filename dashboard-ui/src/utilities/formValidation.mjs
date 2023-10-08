const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};
const validatePassowrd = (password) => {
  return password.trim() !== '';
};

export { validateEmail, validatePassowrd };
