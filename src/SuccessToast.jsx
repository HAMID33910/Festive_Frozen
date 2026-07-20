import { useEffect } from "react";

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
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-[3000] p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl w-[min(100%,460px)] py-8 px-[30px] shadow-[0_16px_40px_rgba(0,0,0,0.25)] text-center relative border border-cancel"
        onClick={(event) => event.stopPropagation()}
        role="status"
        aria-live="polite"
      >
        <button
          type="button"
          className="absolute top-2.5 right-2.5 border-none bg-gray-100 text-gray-600 w-8 h-8 rounded-full cursor-pointer text-xl leading-none"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>
        <div
          className="w-[70px] h-[70px] mx-auto mb-3.5 rounded-full flex items-center justify-center bg-[#e8f5e9] text-[#2e7d32] text-[36px] font-bold"
          aria-hidden="true"
        >
          ✓
        </div>
        <h3 className="m-0 mb-2.5 text-[#8b4513] text-2xl font-semibold">Login successful</h3>
        <p className="m-0 text-[#8b4513] leading-relaxed text-base">{message}</p>
      </div>
    </div>
  );
}

export default SuccessToast;
