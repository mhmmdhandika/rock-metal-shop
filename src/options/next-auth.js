import CredentialsProvider from "next-auth/providers/credentials";
import connectToMongoDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";

const maxDay = 7;

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
      console.log(credentials)
        try {
          await connectToMongoDB();

          const user = await User.findOne({
            $or: [
              { username: credentials.username },
              { email: credentials.email },
            ],
          });

          if (!user) {
            throw new Error("Cannot find the user");
          }

          const decryptPassword = bcrypt.compareSync(
            credentials.password,
            user.password
          );

          if (!decryptPassword) {
            throw new Error("Wrong password");
          }

          const { password, ...userExcludePassword } = user._doc;

          const accessToken = signJwtAccessToken(userExcludePassword, {
            expiresIn: `${maxDay}d`,
          });

          const result = {
            ...userExcludePassword,
            accessToken,
          };

          return result;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: maxDay * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      const sevenDaysInSeconds = 3600 * 24 * maxDay;
      // Check if token is expired or needs to be refreshed
      if (Math.floor(Date.now() / 1000) >= token.exp) {
        // Set the new access token and expiration time
        token.accessToken = signJwtAccessToken(userExcludePassword, {
          expiresIn: `${maxDay}d`,
        });
        token.exp = Math.floor(Date.now() / 1000) + sevenDaysInSeconds;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
  },
};

export default authOptions;
