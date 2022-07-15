import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios.post("auth/register", { email, username, password });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitEmail = (data) => {
    setEmail(data.email);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <div className="register w-full h-screen relative">
      <div className="top">
        <div className="wrapper py-5 px-12 flex items-center justify-between">
          <h1 className="text-primary font-bold text-5xl">PhimNhat</h1>
          <NavLink
            to="/login"
            className=" py-1 px-6 text-lg bg-primary hover:bg-[#db0510] rounded-sm font-medium z-30"
          >
            Sign in
          </NavLink>
        </div>
      </div>
      <div className="container w-full  h-full left-0 top-0 absolute flex items-center justify-center flex-col text-white">
        <h1 className="text-[3.125rem] font-bold">
          Unlimited movies, TV shows, and more.
        </h1>
        <h2 className="m-5 text-3xl font-medium">
          Watch anywhere. Cancel anytime.
        </h2>
        <p className="text-2xl font-medium">
          Ready to watch? Enter your email to create or start your membership.
        </p>
        {!email && (
          <form
            onSubmit={handleSubmit2(onSubmitEmail)}
            className="relative input w-[50%] bg-white flex items-center justify-between mt-5 h-[70px] rounded"
          >
            <input
              className="flex-[9] h-[50%] px-[10px] py-0  text-black outline-none"
              // ref={emailRef}
              name="email"
              type="email"
              placeholder="email address"
              {...register2("email", {
                required: true,
                minLength: 10,
                maxLength: 30,
              })}
            />
            {errors2?.email?.type === "required" && (
              <div className="text-yellow-500 text-lg z-[9999] absolute left-2 top-20 ">
                Please fill your email
              </div>
            )}
            <button
              type="submit"
              className="text-white text-2xl font-light cursor-pointer flex-[3] h-full bg-[#db0510] hover:bg-primary outline-none"
            >
              Get Started
            </button>
          </form>
        )}
        {email && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative input w-[50%] bg-white flex items-center justify-between mt-5 h-[70px] rounded"
          >
            <input
              className="flex-[9] h-[50%] py-0 px-[10px] text-black outline-none"
              type="text"
              name="username"
              placeholder="username"
              {...register("username", {
                required: true,
                maxLength: 10,
                onChange: (e) => setUsername(e.target.value),
              })}
            />
            {errors?.username?.type === "required" && (
              <div className="text-yellow-500 text-lg z-[9999] absolute left-2 top-20 ">
                Please fill your username
              </div>
            )}
            {errors?.username?.type === "maxLength" && (
              <div className="text-yellow-500 text-lg z-[9999] absolute left-2 top-20 ">
                Must be 10 characters or less
              </div>
            )}
            <input
              className="flex-[9] h-[50%] py-0 px-[10px] text-black outline-none"
              type="password"
              name="password"
              placeholder="password"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 20,
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            {errors?.password?.type === "required" && (
              <div className="text-yellow-500 text-lg z-[9999] absolute right-[220px] top-20 ">
                Please fill your password
              </div>
            )}
            {errors?.password?.type === "maxLength" && (
              <div className="text-yellow-500 text-lg z-[9999] absolute right-[-70px] top-20 ">
                Your password must contain between 4 and 60 characters.
              </div>
            )}
            <button
              type="submit"
              className="text-white text-2xl font-light cursor-pointer flex-[3] h-full bg-primary outline-none"
            >
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
