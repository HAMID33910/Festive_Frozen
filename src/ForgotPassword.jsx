import { useState } from "react";
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

        <div className="flex min-h-screen max-[768px]:flex-col">

            <div className="flex-1 relative bg-[url('/src/assets/frozen.jpg')] bg-cover bg-center hidden md:flex items-end p-12">

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                <div className="relative z-10 text-white max-w-lg">

                    <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-2 px-5 text-xs font-semibold tracking-widest uppercase mb-6">
                        Secure Password Recovery
                    </span>

                    <h1 className="font-display text-5xl font-bold text-white mb-4">Forgot Password</h1>

                    <p className="text-white/80 text-base leading-relaxed">

                        Enter your email address and we'll send a
                        secure verification code.

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

                        Enter your registered email.

                    </p>

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >

                        <div className="flex flex-col mb-1">

                            <label className="text-sm font-semibold text-on-surface mb-1">Email</label>

                            <input
                                className="py-3 px-4 border border-outline-variant rounded-lg text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
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

                            <span className="text-error-light text-xs mt-1">

                                {error}

                            </span>

                        }

                        <button
                            className="w-full bg-primary text-white border-none py-3.5 rounded-lg font-semibold text-base cursor-pointer mt-2 hover:bg-primary-dark disabled:opacity-50"
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Sending..."

                                    : "Send OTP"

                            }

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
