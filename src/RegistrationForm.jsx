import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { registerUser } from "./store.js";

function RegistrationForm() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    reset();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Registration</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Username */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username.message}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              {/* Phone */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone must be 10 digits",
                    },
                  })}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address"
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address.message}</div>
                )}
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => reset()}
                >
                  Reset
                </button>
              </div>
            </form>

            {/* Messages */}
            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
