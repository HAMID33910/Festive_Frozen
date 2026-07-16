import { useState, useEffect } from "react";
import "./resetpassword.css";
import { Link, useNavigate } from "react-router-dom";

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
        "http://localhost:3001/api/auth/reset-password",
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
    <div className="reset-screen">
      <div className="reset-visual">
        <div className="reset-visual-image"></div>

        <div className="reset-overlay"></div>

        <div className="reset-content">
          <span className="reset-eyebrow">
            Secure Password Update
          </span>

          <h1>Create New Password</h1>

          <p>
            Your new password should be strong and different from your previous
            password.
          </p>
        </div>
      </div>

      <div className="reset-form-panel">
        <div className="reset-form-wrap">
          <a href="#" className="reset-logo">
            FESTIVE <br />
            FROZEN
          </a>

          <h2>Reset Password</h2>

          <p className="reset-subtext">
            Create a strong password for your account.
          </p>

          <form className="reset-form" onSubmit={handleSubmit}>
            <div className="field">
              <label>New Password</label>

              <div className="input-with-action">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="field">
              <label>Confirm Password</label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <span className="field-error">
                {error}
              </span>
            )}

            <button
              className="submit-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div className="back-login">
            <Link to="/LoginScreen">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}