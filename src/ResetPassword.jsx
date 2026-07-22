import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export default function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/ForgotPassword");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password.trim().length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to update password.");
        return;
      }

      alert("Password updated successfully.");

      localStorage.removeItem("resetEmail");

      navigate("/LoginScreen");
    } catch (err) {
      console.log(err);
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen max-[768px]:flex-col">
      <div className="flex-1 relative bg-[url('/src/assets/frozen.png')] bg-cover bg-center hidden md:flex items-end p-12">

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="relative z-10 text-white">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-2 px-5 text-xs font-semibold tracking-widest uppercase mb-6">
            Secure Password Update
          </span>

          <h1 className="font-display text-5xl font-bold text-white mb-4">Create New Password</h1>

          <p className="text-white/80 text-base leading-relaxed">
            Your new password should be strong and different from your previous
            password.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-10 max-[768px]:p-6">
        <div className="w-full max-w-[420px]">
          <a href="#" className="block font-display text-2xl font-bold text-primary mb-8 no-underline leading-tight">
            FESTIVE <br />
            FROZEN
          </a>

          <h2 className="font-display text-2xl font-bold text-on-surface mb-2">Reset Password</h2>

          <p className="text-on-surface-variant text-sm mb-6">
            Create a strong password for your account.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-1">
              <label className="text-sm font-semibold text-on-surface mb-1">New Password</label>

              <div className="relative">
                <input
                  className="w-full pr-10 py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-on-surface-variant"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="flex flex-col mb-1">
              <label className="text-sm font-semibold text-on-surface mb-1">Confirm Password</label>

              <input
                className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <span className="text-error-light text-xs mt-1">
                {error}
              </span>
            )}

            <button
              className="w-full bg-primary text-white border-none py-3.5 rounded-lg font-semibold text-base cursor-pointer mt-2 hover:bg-primary-dark disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/LoginScreen" className="text-primary font-semibold no-underline text-sm hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
