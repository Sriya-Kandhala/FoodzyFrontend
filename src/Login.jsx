import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const dispatch = useDispatch();
  const { loading, error, message, token } = useSelector(
    (state) => state.login
  );
  

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      Swal.fire("Login Successful!", message || "Welcome!");
      navigate("/home");
    }
  }, [token, message, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .catch((err) => {
        setError("apiError", {
          type: "manual",
          message: err || "Invalid credentials",
        });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "50px" }}>
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Login into account</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          {/* Remember me + Forgot */}
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#!" className="text-primary">Forget Password?</a>
          </div> */}

          {/* Backend errors */}
          {errors.apiError && <p className="text-danger">{errors.apiError.message}</p>}
          {error && <p className="text-danger">{error}</p>}

          {/* Loading */}
          {loading && <p>Logging in...</p>}

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 mb-3">LOGIN</button>

          {/* Or login with */}
          {/* <div className="text-center mb-3">or login with</div>
          <div className="d-flex justify-content-between mb-3 gap-2">
            <button type="button" className="btn btn-primary w-100">facebook</button>
            <button type="button" className="btn btn-danger w-100">google</button>
            <button type="button" className="btn btn-info w-100 text-white">twitter</button>
          </div> */}

          {/* Register link */}
          <div className="text-center">
            Don't have an account? <a href="/register" className="text-primary">Register here</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
