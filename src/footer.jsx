import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>FESTIVE FROZEN</h2>

          <p>
            Premium frozen foods delivered with freshness, quality,
            and convenience for every family.
          </p>

          <div className="footer-social">

            <a href="#">
              <span className="material-symbols-outlined">public</span>
            </a>

            <a href="#">
              <span className="material-symbols-outlined">share</span>
            </a>

            <a href="#">
              <span className="material-symbols-outlined">mail</span>
            </a>

          </div>
        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/hotsales">Hot Sales</Link>
            </li>

            <li>
              <Link to="/offers">Discount Offers</Link>
            </li>

          </ul>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} FESTIVE FROZEN. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;