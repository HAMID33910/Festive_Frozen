import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-footer-border mt-[60px]">

      <div className="max-w-[1280px] mx-auto py-[60px] px-6 flex justify-between items-start gap-[60px] max-[992px]:flex-col max-[992px]:gap-10 max-[992px]:text-center max-[768px]:py-10 max-[768px]:px-5 max-[480px]:px-4">

        <div className="flex-1">
          <h2 className="m-0 text-[30px] text-footer-brand font-bold max-[768px]:text-2xl max-[480px]:text-[22px]">FESTIVE FROZEN</h2>

          <p className="mt-[18px] max-w-[450px] text-on-surface-subtle leading-[1.7] text-[15px] max-[992px]:mx-auto max-[768px]:text-sm max-[480px]:text-[13px]">
            Premium frozen foods delivered with freshness, quality,
            and convenience for every family.
          </p>

          <div className="flex gap-[15px] mt-[25px] max-[992px]:justify-center">

            <a href="#" className="w-[42px] h-[42px] rounded-full bg-surface flex justify-center items-center no-underline text-footer-brand transition-all duration-300 hover:bg-gold hover:text-white max-[480px]:w-[38px] max-[480px]:h-[38px]">
              <span className="material-symbols-outlined">public</span>
            </a>

            <a href="#" className="w-[42px] h-[42px] rounded-full bg-surface flex justify-center items-center no-underline text-footer-brand transition-all duration-300 hover:bg-gold hover:text-white max-[480px]:w-[38px] max-[480px]:h-[38px]">
              <span className="material-symbols-outlined">share</span>
            </a>

            <a href="#" className="w-[42px] h-[42px] rounded-full bg-surface flex justify-center items-center no-underline text-footer-brand transition-all duration-300 hover:bg-gold hover:text-white max-[480px]:w-[38px] max-[480px]:h-[38px]">
              <span className="material-symbols-outlined">mail</span>
            </a>

          </div>
        </div>

        <div>

          <h3 className="text-footer-brand mb-5 max-[768px]:text-xl">Quick Links</h3>

          <ul className="list-none p-0 m-0">

            <li className="mb-[15px]">
              <Link to="/" className="no-underline text-[#444] font-medium transition-colors duration-300 hover:text-gold max-[480px]:text-sm">Home</Link>
            </li>

            <li className="mb-[15px]">
              <Link to="/HotsalesPage" className="no-underline text-[#444] font-medium transition-colors duration-300 hover:text-gold max-[480px]:text-sm">Hot Sales</Link>
            </li>

            <li className="mb-[15px]">
              <Link to="/offers" className="no-underline text-[#444] font-medium transition-colors duration-300 hover:text-gold max-[480px]:text-sm">Discount Offers</Link>
            </li>
            <li className="mb-[15px]">
              <Link to="/TrackOrder" className="no-underline text-[#444] font-medium transition-colors duration-300 hover:text-gold max-[480px]:text-sm">Track Order</Link>
            </li>

          </ul>

        </div>

      </div>

      <div className="border-t border-footer-border py-5 px-5 text-center">
        <p className="m-0 text-on-surface-muted text-sm max-[480px]:text-xs">
          © {new Date().getFullYear()} FESTIVE FROZEN. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
