function LoginRequiredModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-[2000] p-4" onClick={onClose}>
      <div
        className="bg-white rounded-[0.75rem] w-[min(100%,420px)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] text-center"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-required-title"
      >
        <h3 className="m-0 mb-2.5 text-modal-text font-semibold text-lg">Login required</h3>
        <p className="m-0 mb-5 text-modal-subtext leading-relaxed text-sm">
          You need to log in before adding items to your cart or placing an order.
        </p>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="border-none rounded-[0.5rem] px-4 py-2.5 cursor-pointer font-semibold bg-cancel text-cancel-text text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <a
            href="/LoginScreen"
            className="border-none rounded-[0.5rem] px-4 py-2.5 cursor-pointer no-underline font-semibold bg-login-btn text-white text-sm"
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
