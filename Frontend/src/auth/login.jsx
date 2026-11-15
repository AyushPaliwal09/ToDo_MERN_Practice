import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const navigateTo = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", user);
      const res = await axios.post("http://localhost:5000/user/login", user, { withCredentials: true });
      console.log(res);
      navigateTo("/");
      localStorage.setItem("jwt", res.data.token);
      setUser({
        email: "",
        password: ""
      });

    }
    catch (error) {
      console.error("Error in handleSubmit:", error.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              value={user.email}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={user.password}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            // onClick={handleSubmit}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span className="text-indigo-500 cursor-pointer hover:underline">
            <Link to="/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;