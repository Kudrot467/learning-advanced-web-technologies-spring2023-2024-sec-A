"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import axios from 'axios';

const registration = () => {
    const [showPassword, setShowPassWord] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const axiosPublic=useAxiosPublic();
      const onSubmit =async (data) => {
        const username = data.username;
        const contact=data.contact;
        const image_url = data.image_url;
        const email = data.email;
        const password = data.password;
    
        const user = {
          username,
          contact,
          image_url,
          email,
          password
        };
        console.log(user);
        try {
        const response = await axiosPublic.post("/users/signup", data.user, {
          headers: {
            'Content-Type': 'application/json', // Ensure this matches the expected content type
          },
        })
        //   .then((response) => response.json())
        const responseData = response.data;
        console.log(responseData);
        if (response.status === 201) {
         reset();
          Swal.fire("Thank You!", "Registration Successful!", "success");
        }
        }
        catch(error){
          console.error("Error:", error);
        }
        };
    return (
        <div className="max-w-[1220px] mx-auto py-6">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content md:w-3/4 lg:w-full flex-col md:flex-row">
          <div className="card flex-shrink-0 w-full md:w-3/4 lg:w-1/2 shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body pl-4">
              <div className="flex flex-col md:flex-col lg:flex-row gap-1">
                <div className="form-control"></div>
                <div className="form-control w-full">
                  <div className=" text-[#C6A921] font-medium text-lg text-center flex">
                   
                    <h1 className=" text-[#C6A921] font-bold text-2xl rounded-xl w-full underline">
                      Registration
                    </h1>
                  </div>
                  <label className="label">
                    <span className="label-text text-[#C6A921] font-medium text-lg">
                      User Name:
                    </span>
                  </label>
                  <div>
                  <input
                    type="text"
                    {...register("username", { required: true })}
                    placeholder="enter your username"
                    name="username"
                    className="border-2 border-[#C6A921]"
                  />
                  {errors.username && (
                    <span className="text-red-700">*User Name is required</span>
                  )}
                  </div>
                </div>
              </div>
              <div>
                   <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#C6A921] font-medium text-lg">
                     Contact No.
                    </span>
                  </label>
                  <div>
                  <input
                    type="text"
                    {...register("contact", { required: true })}
                    placeholder="Contact no."
                    name="contact"
                    className="border-2 border-[#C6A921]"
                  />
                  {errors.contact && (
                    <span className="text-red-700">*contact number is required</span>
                  )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#C6A921] font-medium text-lg">
                      Image URL
                    </span>
                  </label>
                 <div>
                 <input
                    type="text"
                    {...register("image_url", { required: true })}
                    placeholder="Image url"
                    name="image_url"
                    className="border-2 border-[#C6A921]"
                  />
                  {errors.image_url && (
                    <span className="text-red-700">*image is required</span>
                  )}
                 </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#C6A921] font-medium text-lg">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="email"
                    name="email"
                    className="border-2 border-[#C6A921]"
                  />
                  {errors.email && (
                    <span className="text-red-700">*Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[#C6A921] font-medium text-lg">
                      Password
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern:
                          /(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/,
                      })}
                      placeholder="password"
                      name="password"
                      className="input input-bordered border-[#C6A921]"
                    />
                    {errors.password?.type === "required" && (
                      <span className="text-red-700">
                        *Password is required
                      </span>
                    )}
                    {errors.password?.type === "pattern" && (
                      <span className="text-red-700">
                        *Provie a special Character,one capital letter
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="text-red-700">
                        *Password must be 6 characters
                      </span>
                    )}
                    <span
                      className="absolute top-3 right-2"
                      onClick={() => setShowPassWord(!showPassword)}
                    >
                    </span>
                  </div>
                </div>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="text-white hover:bg-[#C6A921] bg-[#C6A921] p-2 rounded-lg">
                  Registration
                </button>
              </div>
            </form>
            <p className="text-center font-medium text-lg text-[#C6A921]">
              Already have an account ?{" "}
              <Link className="text-red-400" href="/Login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default registration;