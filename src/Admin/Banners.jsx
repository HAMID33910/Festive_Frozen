import { useState, useEffect } from "react";
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
      const res = await fetch("http://localhost:3001/api/banners", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

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
    await fetch(`http://localhost:3001/api/banners/${id}`, { method: "DELETE" });
    getBanners();
  };

  return (
    <div className="w-full">
      <h2 className="text-admin-text mb-6 text-xl font-bold">Hero Banner</h2>

      <form
        className="bg-white p-7 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] max-md:p-5"
        onSubmit={saveBanner}
      >
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[14px] text-[#333]">Hero Banner Image</label>
          <input
            id="bannerImage"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="py-3 px-4 border-2 border-dashed border-[#ddd] rounded-xl cursor-pointer text-[15px] focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20 outline-none"
          />
          <small className="text-[#666] text-[13px]">Recommended Size: 1200px x 420px height</small>
          <small className="text-[#666] text-[13px]">Maximum 3 banners</small>
        </div>
        <button
          className="mt-5 bg-[#8f3f16] text-white border-none py-3 px-7 rounded-xl cursor-pointer flex gap-2 items-center text-[15px] font-semibold transition-all duration-300 hover:bg-[#74310f] max-md:w-full max-md:justify-center"
          type="submit"
        >
          <FiPlus />
          Upload Banner
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-bold text-admin-text mb-5">Uploaded Banners</h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
          {banners.length === 0 ? (
            <p className="text-[#999] text-sm col-span-full">No banners uploaded yet</p>
          ) : (
            banners.map((banner) => (
              <div
                className="relative overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                key={banner._id}
              >
                <img
                  src={`http://localhost:3001/banneruploads/${banner.image}`}
                  alt=""
                  className="w-full h-[180px] object-cover"
                />
                <button
                  className="absolute top-3 right-3 w-10 h-10 border-none rounded-full bg-[#dc2626] text-white cursor-pointer text-lg flex items-center justify-center shadow-lg hover:bg-[#b91c1c] transition-all duration-200"
                  onClick={() => deleteBanner(banner._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Banners;
