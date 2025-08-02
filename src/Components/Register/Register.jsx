import React, { useState } from "react";
import "./Register.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let schema = z
    .object({
      name: z
        .string()
        .min(2, "Name Must Be At Least 2 Characters.")
        .max(30, "Name Must Be At Most 30 Characters."),
      email: z.email("Invalid Email."),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          `Password Must Be At least one uppercase letter, At least one lowercase letter, At least one digit, At least one special character and Be at least 8 characters long.`
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Please Enter a Valid Date.")
        .refine((date) => {
          let now = new Date();
          let userDate = new Date(date);
          now.setHours(0, 0, 0, 0);
          return userDate < now;
        }, "You Can't Enter a Future Date."),
      gender: z.enum(["male", "female"], "Please Select Your Gender."),
    })
    .refine((object) => object.password === object.rePassword, {
      error: "Re-password Does Not Match The Password.",
      path: ["rePassword"],
    });
  let { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  function userData(values) {
    setisLoading(true);
    console.log(values);
    axios
      .post(`https://linked-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        console.log(res);
        if (res.data.message === "success") {
          setisLoading(false);
          navigate("/login");
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
        Create a new account
      </h1>
      {apiError && (
        <h2 className="p-4 text-[1.5rem] text-red-800 rounded-lg bg-red-50 border-1 border-red-300r capitalize text-center font-normal w-full mx-auto md:w-[50%] mb-5">
          {apiError}
        </h2>
      )}
      <form
        className="w-full mx-auto md:w-[50%]"
        onSubmit={handleSubmit(userData)}
      >
        <div className="flex flex-col mb-5 gap-y-2">
          <input
            type="text"
            {...register("name")}
            className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-slate-500 focus:outline-slate-700 focus:outline-2"
            placeholder="Name..."
          />
          {formState.errors.name && formState.touchedFields.name ? (
            <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border-1 border-red-300 ">
              <p className="text-[1.125rem]">{formState.errors.name.message}</p>
            </div>
          ) : (
            ""
          )}
        </div>
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
        <div className="flex flex-col mb-5 gap-y-2">
          <input
            type="password"
            {...register("rePassword")}
            className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-slate-500 focus:outline-slate-700 focus:outline-2"
            placeholder="Re-Password"
          />
          {formState.errors.rePassword && formState.touchedFields.rePassword ? (
            <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border-1 border-red-300 ">
              <p className="text-[1.125rem]">
                {formState.errors.rePassword.message}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="flex flex-col mb-5 gap-y-2 w-full">
            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full h-11 px-5 py-2.5 rounded-full outline-1 outline-slate-500 focus:outline-slate-700 focus:outline-2"
            />
            {formState.errors.dateOfBirth &&
            formState.touchedFields.dateOfBirth ? (
              <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border-1 border-red-300 ">
                <p className="text-[1.125rem]">
                  {formState.errors.dateOfBirth.message}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-6 w-full">
            <div className="flex px-3 gap-x-12 mt-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Male"
                  value="male"
                  {...register("gender")}
                  className="h-5 w-5 mr-2 checked:accent-blue-600"
                />
                <label htmlFor="Male" className="text-2xl">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Female"
                  value="female"
                  {...register("gender")}
                  className="h-5 w-5 mr-2 checked:accent-pink-500"
                />
                <label htmlFor="Female" className="text-2xl">
                  Female
                </label>
              </div>
            </div>
            {formState.errors.gender ? (
              <div className="p-4 my-4 w-full text-sm text-red-800 rounded-lg bg-red-50 border-1 border-red-300 ">
                <p className="text-[1.125rem]">
                  {formState.errors.gender.message}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="group/button w-full  relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-700 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-1 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20 cursor-pointer disabled:bg-gray-600"
        >
          <span className="text-lg">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin text-white"></i>
            ) : (
              "Sign Up"
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
