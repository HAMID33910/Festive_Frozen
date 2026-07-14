import "./LoginRequiredModal.css";

function LoginRequiredModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="login-required-overlay" onClick={onClose}>
      <div
        className="login-required-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-required-title"
      >
        <h3 id="login-required-title">Login required</h3>
        <p>
          You need to log in before adding items to your cart or placing an order.
        </p>

        <div className="login-required-actions">
          <button type="button" className="login-required-cancel" onClick={onClose}>
            Cancel
          </button>
          <a
            href="/LoginScreen"
            className="login-required-login"
            onClick={onClose}
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginRequiredModal;
