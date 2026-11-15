import React from 'react'
import Todo from './Todo.jsx'
import Login from './auth/login.jsx'
import Signup from './auth/signup.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'

const App = () => {
  const token = localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={token ? <Todo /> : <Navigate to={"/login"} />} />
      </Routes>
    </div>
  )
}

export default App
