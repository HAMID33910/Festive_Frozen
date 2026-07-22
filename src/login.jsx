import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { API_URL } from "./config";

export default function LoginScreen() {
  const navigate = useNavigate();
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
    if (!form.remember) next.remember = "Please check Remember me.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
     const res = await fetch(`${API_URL}/api/auth/login`, {
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

sessionStorage.setItem("showLoginToast", "true");

// Redirect after login
window.location.href = "/"; // Change this to your desired route after login
      // redirect or update app state here
    } catch (err) {
      setServerError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const googleLogin = async () => {
    setServerError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const response = await fetch(`${API_URL}/api/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("showLoginToast", "true");
        navigate("/");
      } else {
        setServerError(data.message);
      }
    } catch (err) {
      console.log(err);
      setServerError(err.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen max-[768px]:flex-col">
      <div className="flex-1 relative bg-[url('/src/assets/frozen.png')] bg-cover bg-center hidden md:flex items-center p-12">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 text-white max-w-lg">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-2 px-5 text-xs font-semibold tracking-widest uppercase mb-6">Premium Quality Assurance</span>
          <h1 className="font-display text-5xl font-bold mb-4">Welcome back</h1>
          <p className="text-white/80 text-base leading-relaxed">
            Log in to track orders, reorder favorites, and keep your FreshRewards
            discounts active.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-10 max-[768px]:p-6 max-[480px]:p-4">
        <div className="w-full max-w-[420px]">
          <Link to="/" className="block font-display text-2xl font-bold text-primary mb-8 no-underline leading-tight">FESTIVE <br />FROZEN</Link>

          <h2 className="font-display text-2xl font-bold text-on-surface mb-2 max-[480px]:text-xl">Log in to your account</h2>
          <p className="text-on-surface-variant text-sm mb-6">
            New here? 
            <Link to="/SignupScreen" className="text-primary font-semibold no-underline hover:underline">Create an account</Link>
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col mb-1">
              <label className="text-sm font-semibold text-on-surface mb-1" htmlFor="email">Email</label>
              <input
                className="w-full py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="text-error-light text-xs mt-1">{errors.email}</span>}
            </div>

            <div className="flex flex-col mb-1">
              <label className="text-sm font-semibold text-on-surface mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  className="w-full pr-10 py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-on-surface-variant"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {errors.password && <span className="text-error-light text-xs mt-1">{errors.password}</span>}
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  required
                />
                <span>Remember me</span>
              </label>
              
              <Link className="text-primary text-sm font-medium no-underline hover:underline" to="/ForgotPassword">Forgot password</Link>
            </div>

            {errors.remember && <span className="text-error-light text-xs mt-1">{errors.remember}</span>}

            {serverError && <span className="text-error-light text-xs mt-1">{serverError}</span>}

            <button className="w-full bg-primary text-white border-none py-3.5 rounded-lg font-semibold text-base cursor-pointer mt-2 hover:bg-primary-dark disabled:opacity-50" type="submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6 text-on-surface-variant text-sm"><div className="flex-1 h-px bg-outline-variant"></div><span>or continue with</span><div className="flex-1 h-px bg-outline-variant"></div></div>

          <div className="flex flex-col gap-3">
            <button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-outline-variant rounded-lg py-3 text-sm font-semibold text-on-surface cursor-pointer hover:bg-surface-container" onClick={googleLogin}>
              <svg width="20" height="20" viewBox="0 0 48 48" style={{marginRight: 8}}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.998 23.998 0 0 0 0 24c0 3.77.9 7.35 2.56 10.53l7.97-5.94z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.94C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>
            {serverError && <span className="text-error-light text-xs mt-1 text-center">{serverError}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}