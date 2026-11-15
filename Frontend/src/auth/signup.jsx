import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const [user,setUser]= useState({
    username : "",
    email : "",
    password : ""
  })
  const navigateTo = useNavigate();
   const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
   }
   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/user/signup", user, { withCredentials: true });
      // console.log(res);
         localStorage.setItem("jwt", res.data.token);
      setUser({
        username : "",
        email : "",
        password : ""
      });
      navigateTo("/");

    }
    catch(error){
      console.error("Error in handleSubmit:", error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-indigo-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={user.username}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={user.email}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Create a password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span className="text-pink-500 cursor-pointer hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;