import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <section className="py-16 px-6 max-w-[1280px] mx-auto max-sm:py-10 max-sm:px-4">

      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-primary mb-2 max-sm:text-3xl">All Categories</h1>
        <p className="text-on-surface-variant">
          Browse our premium frozen food collections.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">

        {categories.map((category) => (
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-card transition-transform duration-300 hover:-translate-y-1.5"
            key={category._id}
          >

            <div className="h-[200px] overflow-hidden">

              <img
                className="w-full h-full object-cover"
                src={`http://localhost:3001/uploads/${category.image}`}
                alt={category.title}
              />

            </div>

            <div className="p-4 text-center">

              <h3 className="font-display text-xl text-on-surface mb-2">{category.title}</h3>

              <p className="text-sm text-on-surface-variant mb-3">{category.discount}</p>

              <button
                className="bg-primary text-white border-none py-2.5 px-6 rounded-lg cursor-pointer text-sm font-semibold hover:bg-primary-dark"
                onClick={() =>
                  // navigate(`/category/${category._id}`)
                  navigate(`/category/${category._id}`)
                }
              >
                Explore Products
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
    <Footer />
    </>
  );
}

export default Categories;
