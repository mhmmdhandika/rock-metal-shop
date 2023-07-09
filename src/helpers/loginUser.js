const { signIn } = require('next-auth/react');

const loginUser = async ({ username, password }) => {
  const res = await signIn('credentials', {
    redirect: false,
    username,
    password,
  });
  return res;
};

export default loginUser;
