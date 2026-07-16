import { useState, useRef, useEffect } from "react";
import "./otp.css";
import { Link, useNavigate } from "react-router-dom";

export default function OTP() {

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [timer, setTimer] = useState(300);

  const inputs = useRef([]);

  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {

      setTimer((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const formatTime = () => {

    const min = Math.floor(timer / 60);

    const sec = timer % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  };

  const handleChange = (e, index) => {

    const value = e.target.value.replace(/\D/g, "");

    if (!value) {

      const newOtp = [...otp];

      newOtp[index] = "";

      setOtp(newOtp);

      return;

    }

    const newOtp = [...otp];

    newOtp[index] = value[0];

    setOtp(newOtp);

    if (index < 5) {

      inputs.current[index + 1].focus();

    }

  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && otp[index] === "" && index > 0) {

      inputs.current[index - 1].focus();

    }

  };

  const handlePaste = (e) => {

    e.preventDefault();

    const paste = e.clipboardData.getData("text").replace(/\D/g, "");

    if (paste.length !== 6) return;

    const arr = paste.split("");

    setOtp(arr);

    arr.forEach((num, i) => {

      inputs.current[i].value = num;

    });

  };

  const verifyOTP = async (e) => {

    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {

      setError("Enter complete OTP");

      return;

    }

    setLoading(true);

    setError("");

    try {

      const res = await fetch("http://localhost:3001/api/auth/verify-otp", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          email,

          otp: finalOtp,

        }),

      });

      const data = await res.json();

      if (!data.success) {

        setError(data.message);

        return;

      }

      navigate("/ResetPassword");

    }

    catch {

      setError("Server Error");

    }

    finally {

      setLoading(false);

    }

  };

  const resendOTP = async () => {

    setLoading(true);

    try {

      await fetch("http://localhost:3001/api/auth/send-otp", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          email,

        }),

      });

      setTimer(300);

      setOtp(["", "", "", "", "", ""]);

      inputs.current[0].focus();

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="otp-screen">

      <div className="otp-visual">

        <div className="otp-visual-image"></div>

        <div className="otp-overlay"></div>

        <div className="otp-content">

          <span className="otp-eyebrow">

            Secure Verification

          </span>

          <h1>Email Verification</h1>

          <p>

            Enter the six digit verification code sent to your email.

          </p>

        </div>

      </div>

      <div className="otp-form-panel">

        <div className="otp-form-wrap">

          <a href="#" className="otp-logo">

            FESTIVE <br />

            FROZEN

          </a>

          <h2>Verify OTP</h2>

          <p className="otp-subtext">

            Verification code sent to

            <br />

            <strong>{email}</strong>

          </p>

          <form onSubmit={verifyOTP}>

            <div className="otp-inputs" onPaste={handlePaste}>

              {otp.map((digit, index) => (

                <input

                  key={index}

                  ref={(el) => (inputs.current[index] = el)}

                  maxLength="1"

                  value={digit}

                  onChange={(e) => handleChange(e, index)}

                  onKeyDown={(e) => handleKeyDown(e, index)}

                />

              ))}

            </div>

            {error &&

              <p className="otp-error">

                {error}

              </p>

            }

            <div className="timer">

              {formatTime()}

            </div>

            <button

              className="submit-btn"

              disabled={loading}

            >

              {

                loading

                  ? "Verifying..."

                  : "Verify OTP"

              }

            </button>

          </form>

          <button

            className="resend-btn"

            disabled={timer > 0}

            onClick={resendOTP}

          >

            Resend OTP

          </button>

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