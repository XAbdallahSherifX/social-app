import React, { useContext, useState } from "react";
import "./Login.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  let { setuserLogin } = useContext(UserContext);

  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let schema = z.object({
    email: z.email("Invalid Email."),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        `Password Must Be At least one uppercase letter, At least one lowercase letter, At least one digit, At least one special character and Be at least 8 characters long.`
      ),
  });

  let { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  function HandleLogin(values) {
    setisLoading(true);
    console.log(values);
    axios
      .post(`https://linked-posts.routemisr.com/users/signin`, values)
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          setisLoading(false);
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setapiError(err.response.data.error);
        setisLoading(false);
      });
  }
  return (
    <>
      <h1 className="text-center text-4xl font-extralight font-mono py-10">
        Log in
      </h1>
      {apiError && (
        <h2 className="p-4 text-[1.5rem] text-red-800 rounded-lg bg-red-50 border-1 border-red-300r capitalize text-center font-normal w-full mx-auto md:w-[50%] mb-5">
          {apiError}
        </h2>
      )}
      <form
        className="w-full mx-auto md:w-[50%]"
        onSubmit={handleSubmit(HandleLogin)}
      >
        <div className="flex flex-col mb-5 gap-y-2">
          <input
            type="email"
            {...register("email")}
            className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-slate-500 focus:outline-slate-700 focus:outline-2"
            placeholder="Email address..."
          />
          {formState.errors.email && formState.touchedFields.email ? (
            <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border-1 border-red-300 ">
              <p className="text-[1.125rem]">
                {formState.errors.email.message}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col mb-5 gap-y-2">
          <input
            type="password"
            {...register("password")}
            className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-slate-500 focus:outline-slate-700 focus:outline-2"
            placeholder="Password"
            autoComplete=""
          />
          {formState.errors.password && formState.touchedFields.password ? (
            <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border-1 border-red-300 ">
              <p className="text-[1.125rem]">
                {formState.errors.password.message}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="group/button w-full relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-700 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-1 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 cursor-pointer disabled:bg-gray-600"
        >
          <span className="text-lg">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin text-white"></i>
            ) : (
              "Sign In"
            )}
          </span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div className="relative h-full w-10 bg-white/20"></div>
          </div>
        </button>
      </form>
    </>
  );
}
