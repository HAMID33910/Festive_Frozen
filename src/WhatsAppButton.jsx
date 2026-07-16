import { FaWhatsapp } from "react-icons/fa";
import "./whatsappButton.css";

function WhatsAppButton() {
  const phone = "923001234567"; // Replace with your WhatsApp number
  const message = "Hello, I'm interested in your products.";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;