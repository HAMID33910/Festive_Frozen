import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

export default function LoginScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.password) next.password = "Enter your password.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
     const res = await fetch("http://localhost:3001/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: form.email,
    password: form.password,
  }),
});
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Login failed.");
        return;
      }

      if (form.remember) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
} else {
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("user", JSON.stringify(data.user));
}

alert(data.message);

// Redirect after login
window.location.href = "/"; // Change this to your desired route after login
      // redirect or update app state here
    } catch (err) {
      setServerError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-visual">
        <div className="login-visual-image" />
        <div className="login-visual-overlay" />
        <div className="login-visual-content">
          <span className="login-eyebrow">Premium Quality Assurance</span>
          <h1>Welcome back</h1>
          <p>
            Log in to track orders, reorder favorites, and keep your FreshRewards
            discounts active.
          </p>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-wrap">
          <a className="login-logo" href="#">FESTIVE <br />FROZEN</a>

          <h2>Log in to your account</h2>
          <p className="login-subtext">
            New here? 
            <Link to="/SignupScreen" className="signup-link">Create an account</Link>
          </p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-with-action">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="login-row">
              <label className="remember-check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <a className="forgot-link" href="#forgot">Forgot password?</a>
            </div>

            {serverError && <span className="field-error">{serverError}</span>}

            <button className="submit-btn" type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="divider"><span>or continue with</span></div>

          <div className="oauth-row">
            <button type="button" className="oauth-btn">Google</button>
            <button type="button" className="oauth-btn">Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
}