import "./hero.css";
import CuratedCollections from "./CuratedCollections.jsx";
import Products from "./products.jsx";
import HotSales from "./hotsales.jsx";
import Values from "./values.jsx";
import Footer from "./footer.jsx";
import Navbar from "./navbar.jsx";


function Hero() {
  return (
    <>
    <Navbar/>
    <section className="hero-section-image">
      <div className="hero-container">
        {/* Background */}
        <div className="hero-bg">
          <div
            className="hero-image"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXdHSfM9asYOBqIOaGnJfOnLHdKuw2hKYh-8_FA7rMFp8cMEU6IJTmW9hso9-HKQNn7cxwRdzWwHd2XpCbqk3cwHdX4xzFXFgTT-dzPDO7Lv3Gxym-WScayYbTBRZ72dHNQquc504YJTR206P7WSZjoPCnwrxphYCoNNPY6RPI5CNXr_jtA52xj_5PNnUAID28WJxPWGMOKBKNjQsj1OF7g7ra04gj8Rs5tY_HQlSQd9fempiy4yTD5R50qP1MJtxO21I7mZyQxA")',
            }}
          ></div>

          <div className="hero-overlay"></div>
        </div>

        {/* Content */}

        <div className="hero-content">
          <span className="hero-tag">
            Premium Quality Assurance
          </span>

          <h1>
            Freshness Frozen
            <br />
            in Time
          </h1>

          <p>
            Experience gourmet quality in minutes. Our flash-freezing
            technology locks in peak nutrients and flavor better than
            traditional shipping methods.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">
              Shop Now
            </button>

            <button className="process-btn">
              Our Process
            </button>
          </div>
        </div>
      </div>
      
    </section>
    
    <CuratedCollections/>
    <Products/>
    <HotSales/>
    <Values/>
    <Footer/>
    </>
  );
}

export default Hero;