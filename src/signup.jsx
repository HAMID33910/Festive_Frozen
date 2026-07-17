import { useState } from "react";
import "./signup.css";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { Link, useNavigate } from "react-router-dom";



export default function SignupScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);



 const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const response = await fetch("http://localhost:3001/api/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
      }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.log(err);
  }
};


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Enter your last name.";
    if (!/^[0-9+\-\s()]{7,}$/.test(form.phone)) next.phone = "Enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.password.length < 8) next.password = "At least 8 characters.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match.";
    if (!form.agree) next.agree = "You need to accept the terms.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setSubmitting(true);

  try {
    const response = await fetch("http://localhost:3001/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (data.success) {
      alert(data.message);
      navigate("/LoginScreen");

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });

      setErrors({});
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Server Error");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="signup-screen">
      <div className="signup-visual">
        <div className="signup-visual-image" />
        <div className="signup-visual-overlay" />
        <div className="signup-visual-content">
          <span className="signup-eyebrow">Premium Quality Assurance</span>
          <h1>Join FreshRewards</h1>
          <p>
            Create an account to unlock member pricing, early access to seasonal
            drops, and free bulk shipping.
          </p>
          <ul className="signup-perks">
            <li><span className="material-symbols-outlined">ac_unit</span>Flash-frozen, chef-approved quality</li>
            <li><span className="material-symbols-outlined">local_shipping</span>48-hour cold-chain delivery</li>
            <li><span className="material-symbols-outlined">verified</span>Exclusive discounts on every order</li>
          </ul>
        </div>
      </div>

      <div className="signup-form-panel">
        <div className="signup-form-wrap">
          <a className="signup-logo" href="#">FESTIVE <br />FROZEN</a>

          <h2>Create your account</h2>
          <p className="signup-subtext">
            Already have one? <Link to="/LoginScreen" className="login-link">Log in</Link>
          </p>

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={handleChange}
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>

              <div className="field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="field-row">

            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

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
            </div>
            <div className="field-row">

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-with-action">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
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

            <div className="field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
            </div>
            </div>

            <div className="field-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span>
                  I agree to the <a href="#terms">Terms of Service</a> and{" "}
                  <a href="#privacy">Privacy Policy</a>
                </span>
              </label>
              {errors.agree && <span className="field-error">{errors.agree}</span>}
            </div>

            <button className="submit-btn" type="submit" disabled={submitting}>
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="divider"><span>or continue with</span></div>

          <div className="oauth-row">
            <button
                  type="button"
                className="oauth-btn"
                 onClick={googleLogin}
>
                  Google
                 </button>
            <button type="button" className="oauth-btn">Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
}