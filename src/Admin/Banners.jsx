import { useState, useEffect } from "react";
import "./banners.css";
import { FiPlus, FiTrash2 } from "react-icons/fi";

function Banners() {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/banners");
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveBanner = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a banner image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        "http://localhost:3001/api/banners",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      alert("Banner Uploaded Successfully");

      setImage(null);

      document.getElementById("bannerImage").value = "";

      getBanners();

    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  const deleteBanner = async (id) => {
    if (!window.confirm("Delete Banner?")) return;

    await fetch(
      `http://localhost:3001/api/banners/${id}`,
      {
        method: "DELETE",
      }
    );

    getBanners();
  };

  return (
    <div className="banner-page">

      <div className="banner-header">
        <h2>Hero Banner</h2>
      </div>

      <form
        className="banner-form"
        onSubmit={saveBanner}
      >

        <div className="banner-upload-box">

          <label>Hero Banner Image</label>

          <input
            id="bannerImage"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />

          <small className="banner-size">
            Recommended Size : 1920 × 850 px
          </small>

          <small className="banner-size">
            Maximum 3 banners
          </small>

        </div>

        <button
          className="banner-save-btn"
          type="submit"
        >
          <FiPlus />
          Upload Banner
        </button>

      </form>

      <div className="banner-list">

        <h3>Uploaded Banners</h3>

        <div className="banner-grid">

          {banners.map((banner) => (

            <div
              className="banner-card"
              key={banner._id}
            >

              <img
                src={`http://localhost:3001/banneruploads/${banner.image}`}
                alt=""
              />

              <button
                className="banner-delete-btn"
                onClick={() =>
                  deleteBanner(banner._id)
                }
              >
                <FiTrash2 />
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Banners;