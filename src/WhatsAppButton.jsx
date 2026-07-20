import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  const phone = "923259851324"; // Replace with your WhatsApp number
  const message = "Hello, I'm interested in your products.";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[25px] right-[25px] w-[65px] h-[65px] bg-whatsapp text-white rounded-full flex justify-center items-center text-[34px] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.25)] z-[9999] transition-all duration-300 hover:scale-110 hover:bg-whatsapp-hover"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;
