import { useEffect, useState } from "react";
import "./CuratedCollections.css";

function CuratedCollections() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="collections">
      <div className="collections-header">
        <div>
          <h2>Curated Collections</h2>
          <p>Explore our diverse range of flash-frozen essentials.</p>
        </div>

        <button className="view-btn">
          View All Categories
        </button>
      </div>

      <div className="collections-grid">
        {categories.map((item) => (
          <div className="collection-card" key={item._id}>
            <img
              src={`http://localhost:3001/uploads/${item.image}`}
              alt={item.title}
            />

            <div className="overlay"></div>

            <div className="content">
              <h3>{item.title}</h3>
              <button>Explore</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CuratedCollections;