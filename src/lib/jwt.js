import jwt from 'jsonwebtoken';

const DEFAULT_SIGN_OPTION = {
  expiresIn: '2d',
};

const { SECRET_KEY } = process.env;

export function signJwtAccessToken(payload, options = DEFAULT_SIGN_OPTION) {
  const token = jwt.sign(
    {
      id: payload._id,
      isAdmin: payload.isAdmin,
    },
    SECRET_KEY,
    options
  );
  return token;
}

export function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
