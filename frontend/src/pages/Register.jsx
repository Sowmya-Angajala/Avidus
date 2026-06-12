// src/pages/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

import {
  useToast
} from "../context/ToastContext";

const Register = () => {

  const navigate = useNavigate();

  const { showToast } =
    useToast();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !formData.name ||
        !formData.email ||
        !formData.password
      ) {

        showToast(
          "error",
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await API.post(
            "/auth/register",
            formData
          );

        showToast(
          "success",
          response.data.message ||
          "Registration successful"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } catch (error) {

        showToast(
          "error",
          error.response?.data?.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="auth-page">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {
            loading
              ? "Creating Account..."
              : "Register"
          }
        </button>

        <p className="auth-link">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Register;