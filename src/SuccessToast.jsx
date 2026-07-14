import { useEffect } from "react";
import "./SuccessToast.css";

function SuccessToast({ isOpen, message, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="success-toast-overlay" onClick={onClose}>
      <div
        className="success-toast-modal"
        onClick={(event) => event.stopPropagation()}
        role="status"
        aria-live="polite"
      >
        <button type="button" className="success-toast-close" onClick={onClose} aria-label="Close popup">
          ×
        </button>
        <div className="success-toast-icon" aria-hidden="true">
          ✓
        </div>
        <h3>Login successful</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default SuccessToast;
