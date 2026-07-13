import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Navbar />
    <section className="categories-page">

      <div className="categories-container">

        <div className="categories-heading">
          <h1>All Categories</h1>
          <p>
            Browse our premium frozen food collections.
          </p>
        </div>

        <div className="categories-grid">

          {categories.map((category) => (
            <div
              className="category-card"
              key={category._id}
            >

              <div className="category-image">

                <img
                  src={`http://localhost:3001/uploads/${category.image}`}
                  alt={category.title}
                />

              </div>

              <div className="category-content">

                <h3>{category.title}</h3>

                <p>{category.discount}</p>

                <button
                  onClick={() =>
                    navigate(`/category/${category._id}`)
                  }
                >
                  Explore Products
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
    <Footer />
    </>
  );
}

export default Categories;