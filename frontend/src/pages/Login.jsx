import { useState } from "react";

import API from "../api/axios";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import {
  useToast
} from "../context/ToastContext";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const { showToast } =
    useToast();

  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/auth/login",
            form
          );

        login(
          res.data.user,
          res.data.token
        );

        showToast(
          "success",
          "Login successful"
        );

        navigate(
          "/dashboard"
        );

      } catch (err) {

        showToast(
          "error",
          err.response?.data?.message ||
          "Login failed"
        );

      }

    };

  return (
    <div className="auth-page">

      <form
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;