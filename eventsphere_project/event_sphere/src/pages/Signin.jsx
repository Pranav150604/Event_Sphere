import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signin', {
        email,
        password,
      });
      const { token } = response.data;
      // Store the token in localStorage
      localStorage.setItem('jwtToken', token);
      // Redirect to a protected route or handle post-login logic
      navigate("/home")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-center items-center">
        <div className=" w-[400px] mt-[-200px] ">
          <div className="text-3xl font-bold text-orange-500 mb-5">eventSphere</div>
          <div className="text-5xl font-bold mt-2 mb-5">Log in</div>
          <form onSubmit={handleSignIn}>
          <div class="mb-6">
              <label
                for="email"
                className="block mb-2 text-md font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                placeholder="john.doe@company.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-md font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                placeholder="•••••••••"
                required
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              type="submit"
              class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        <img
          className="h-[100vh] object-cover"
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
};
