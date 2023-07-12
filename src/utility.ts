export const extractUserFromToken = (token) => {
  if (!token) {
    return null;
  }

  let user;

  const userToken = token.split(' ')[1];

  if (userToken) {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    user = data;
  }

  return user;
};
