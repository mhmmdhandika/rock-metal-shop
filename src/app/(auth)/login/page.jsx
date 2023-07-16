"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import loginUser from "@/helpers/loginUser";

function Login() {
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    const responseLogin = await loginUser({
      username: data.username,
      password: data.password,
    });

    if (!responseLogin) {
      console.log(responseLogin);
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className="relative h-screen w-full"
      style={{
        backgroundImage: `url("/assets/img/auth/bg-login.jpg"), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        backgroundAttachment: "fixed",
      }}
    >
      <form
        className="form-auth-register absolute left-1/2 top-1/2 flex w-[30rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 bg-white p-7 text-black"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-3xl font-light">SIGN IN</h1>
        <div className="grid grid-cols-1 gap-3">
          {/* username */}
          <input
            type="text"
            placeholder="username"
            {...register("username", { required: true })}
          />
          {/* password */}
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="underline">
            Forgot password?
          </a>
          <a href="#" className="underline">
            Create a new account
          </a>
        </div>
        <div className="flex justify-end gap-3">
          <Link
            href="/"
            className="text-md bg-slate-300 px-5 py-2 font-semibold text-slate-600"
          >
            BACK
          </Link>
          <button
            type="submit"
            className="text-md bg-teal-500 px-5 py-2 font-semibold text-white"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
