import React, { useContext, useEffect, useState } from "react";
import { login } from "../../contexts/authContext/apiCalls";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { dispatch, user, error, signInWithGoogle, signInWithFacebook } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    login({ email, password }, dispatch);
    if (user) {
      navigate("/");
    }
  };

  return (
    <div className="login w-full h-screen relative">
      <div className="top">
        <div className="wrapper py-5 px-12 flex items-center justify-between">
          <h1 className="text-primary font-bold text-5xl">PhimNhat</h1>
        </div>
      </div>
      <div className="container w-full h-full top-0 left-0 absolute flex items-center flex-col text-white">
        <div className="w-[450px] h-[600px] p-[30px] rounded bg-black flex flex-col justify-around mt-20">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-7 py-7 rounded-md flex flex-col gap-2 "
          >
            {error && (
              <div className="text-yellow-500 text-sm z-[9999] absolute left-15 top-[150px] mt-1 ">
                {error}
              </div>
            )}
            <h1 className="text-3xl font-bold mb-8">Sign In</h1>
            <input
              className="input-signUp"
              type="email"
              name="email"
              placeholder="Email or phonenumber"
              {...register("email", {
                required: true,
                minLength: 10,
                maxLength: 30,
                onChange: (e) => setEmail(e.target.value),
              })}
            />
            {errors?.email?.type === "required" && (
              <div className="text-yellow-500 text-sm z-[9999] absolute left-15 top-[220px] mt-1 ">
                Please enter a valid email or phone number.
              </div>
            )}
            <input
              className="input-signUp mt-3"
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 20,
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            {errors?.password?.type === "required" && (
              <div className="text-yellow-500 text-sm z-[9999] absolute left-15 top-[290px] ">
                Please fill your password
              </div>
            )}
            {errors?.password?.type === "maxLength" && (
              <div className="text-yellow-500 text-sm z-[9999] absolute  left-15 top-[290px] ">
                Your password must contain between 4 and 60 characters.
              </div>
            )}
            <button
              className="w-full h-10 rounded-md bg-primary hover:bg-[#db0510] text-white outline-none text-lg font-medium cursor-pointer mt-4"
              type="submit"
            >
              Sign In
            </button>
            <h3 className="text-center text-xl mt-4">Or</h3>
          </form>
          <div className="social flex flex-col gap-5 px-7 mb-7">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex items-center justify-center space-x-8 py-2 rounded-md hover:bg-opacity-80 shadow-lg bg-white relative text-black font-bold text-lg"
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
              className="flex items-center justify-center space-x-8 px-4 py-2 rounded-md hover:bg-opacity-80 shadow-lg bg-[#2D88FF] relative text-white font-bold text-lg w-full mb-2"
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
            <div className="flex flex-col gap-3">
              <span className=" text-slate-400">
                New to PhimNhat?{" "}
                <Link to="/register" className="text-white">
                  Sign up now.
                </Link>
              </span>
              <span className="text-sm text-slate-400">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot. <b className="text-white">Learn more</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
