import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export async function verifyToken(headerToken, nextAction) {
  const authHeader = headerToken;

  try {
    if (!authHeader) {
      throw new Error("You are not authenticated");
    }

    // get rid of "Bearer" word from token
    const token = authHeader.split(" ")[1];

    const verifyToken = jwt.verify(token, SECRET_KEY);

    if (nextAction) {
      return nextAction(verifyToken);
    }

    return verifyToken;
  } catch (error) {
    return { error: true, status: 401, message: error.message };
  }
}

export async function verifyTokenAndAuthorization(headerToken, paramId) {
  try {
    const userTokenData = await verifyToken(
      headerToken,
      (verifyToken) => verifyToken
    );

    if (userTokenData.error) {
      throw new Error(userData.message);
    }

    if (userTokenData.id !== paramId) {
      throw new Error("You are not allowed to do that");
    }

    return userTokenData;
  } catch (error) {
    return { error: true, status: 403, message: error.message };
  }
}

export async function verifyTokenAndAdmin(headerToken) {
  try {
    const userData = await verifyToken(
      headerToken,
      (verifyToken) => verifyToken
    );

    if (userData.error) {
      throw new Error(userData.message);
    }

    if (!userData.isAdmin) {
      throw new Error("You are not an admin");
    }

    return userData;
  } catch (error) {
    return { error: true, status: 403, message: error.message };
  }
}
