import React, { useContext, useState } from "react";
import { login } from "../../contexts/authContext/apiCalls";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { dispatch, signInWithGoogle, signInWithFacebook } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    login({ email, password }, dispatch);
    navigate("/");
  };

  return (
    <div className="login relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <h1 className="absolute left-4 text-[#e50914] font-bold text-5xl top-4 cursor-pointer object-contain md:left-10 md:top-6">
        PhimNhat
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" relative space-y-8 rounded  bg-black/75 py-10 px-6 md:mt-0  md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className=" inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: true,
                onChange: (e) => setEmail(e.target.value),
              })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className=" inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", {
                required: true,
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button className="w-full rounded bg-[#e50914] py-3 font-semibold">
          Sign In
        </button>
        <h3 className="text-center text-xl mt-4">Or</h3>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center space-x-8 py-2 rounded-md hover:bg-opacity-80 shadow-lg bg-white relative text-black font-bold text-lg"
        >
          <svg
            className="h-8 w-8 absolute left-2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            style={{ fill: "#000000" }}
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Login with Google
        </button>
        <button
          type="button"
          onClick={signInWithFacebook}
          className="flex w-full items-center justify-center space-x-8 px-4 py-2 rounded-md hover:bg-opacity-80 shadow-lg bg-[#2D88FF] relative text-white font-bold text-lg  mb-2"
        >
          <svg
            className="w-8 h-8 absolute left-2"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            style={{ fill: "#000000" }}
          >
            <linearGradient
              id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
              x1="9.993"
              x2="40.615"
              y1="9.993"
              y2="40.615"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2aa4f4"></stop>
              <stop offset="1" stopColor="#007ad9"></stop>
            </linearGradient>
            <path
              fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
              d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
            ></path>
            <path
              fill="#fff"
              d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
            ></path>
          </svg>
          Login with Facebook
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <Link to="/register">
            <button
              type="submit"
              className="text-white hover:underline"
              //onClick={() => setLogin(false)}
            >
              Sign up now
            </button>
          </Link>
        </div>
        <span className="text-sm text-[gray]">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <b className="text-white">Learn more</b>
        </span>
      </form>
    </div>
  );
};

export default Login;
