import { useState } from "react";
import "./forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const res = await fetch(
                "http://localhost:3001/api/auth/send-otp",
                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                    },

                    body: JSON.stringify({

                        email,

                    }),

                }
            );

            const data = await res.json();

            if (!data.success) {

                setError(data.message);

                return;

            }

            localStorage.setItem("resetEmail", email);

            navigate("/OTP");

        }

        catch {

            setError("Server Error");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="forgot-screen">

            <div className="forgot-visual">

                <div className="forgot-visual-image"></div>

                <div className="forgot-visual-overlay"></div>

                <div className="forgot-visual-content">

                    <span className="forgot-eyebrow">
                        Secure Password Recovery
                    </span>

                    <h1>Forgot Password</h1>

                    <p>

                        Enter your email address and we'll send a
                        secure verification code.

                    </p>

                </div>

            </div>

            <div className="forgot-form-panel">

                <div className="forgot-form-wrap">

                    <a href="#" className="forgot-logo">

                        FESTIVE <br />

                        FROZEN

                    </a>

                    <h2>Reset Password</h2>

                    <p className="forgot-subtext">

                        Enter your registered email.

                    </p>

                    <form
                        className="forgot-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="field">

                            <label>Email</label>

                            <input

                                type="email"

                                placeholder="you@example.com"

                                value={email}

                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }

                                required

                            />

                        </div>

                        {error &&

                            <span className="field-error">

                                {error}

                            </span>

                        }

                        <button
                            className="submit-btn"
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Sending..."

                                    : "Send OTP"

                            }

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