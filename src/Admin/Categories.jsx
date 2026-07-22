import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { API_URL } from "../config";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();

    if (!editId && !image) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }

    try {
      const url = editId
        ? `${API_URL}/api/categories/${editId}`
        : `${API_URL}/api/categories`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (res.ok) {
        getCategories();
        resetForm();
      } else {
        console.log(data);
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`${API_URL}/api/categories/${id}`, { method: "DELETE" });
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = (category) => {
    setEditId(category._id);
    setTitle(category.title);
    setImage(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setTitle("");
    setImage(null);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <h2 className="text-xl font-bold text-admin-text">Categories</h2>
        <button
          className="flex items-center gap-2 bg-[#8f3f16] text-white border-none rounded-xl py-3 px-5 text-[15px] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#74310f] max-sm:w-full max-sm:justify-center"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[450px]">
            <thead>
              <tr className="bg-[#8f3f16] text-white">
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Image</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Category Name</th>
                <th className="py-3.5 px-5 text-center text-[13px] font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-[#999] text-sm">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 px-5">
                      <img
                        src={`${API_URL}/uploads/${category.image}`}
                        alt={category.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>
                    <td className="py-3 px-5 text-sm font-medium text-[#333]">{category.title}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="w-9 h-9 flex items-center justify-center border-none rounded-lg cursor-pointer text-white bg-[#3b82f6] hover:bg-[#2563eb] transition-all duration-200 hover:-translate-y-0.5"
                          onClick={() => editCategory(category)}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          className="w-9 h-9 flex items-center justify-center border-none rounded-lg cursor-pointer text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-all duration-200 hover:-translate-y-0.5"
                          onClick={() => deleteCategory(category._id)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/45 flex justify-center items-center z-[9999] p-4">
          <div className="w-[500px] max-w-[95%] bg-white rounded-2xl p-[30px] shadow-2xl max-sm:p-5">
            <h2 className="mb-6 text-admin-text font-bold text-xl">
              {editId ? "Update Category" : "Add Category"}
            </h2>
            <form onSubmit={addCategory} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Category Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] box-border transition-all duration-300 focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required={!editId}
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] box-border transition-all duration-300 focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              />
              <div className="flex justify-end gap-3 mt-2 max-sm:flex-col">
                <button
                  type="submit"
                  className="border-none py-3 px-6 rounded-xl cursor-pointer text-[15px] transition-all duration-300 bg-[#8f3f16] text-white font-semibold hover:bg-[#74310f] max-sm:w-full"
                >
                  {editId ? "Update Category" : "Save Category"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border-none py-3 px-6 rounded-xl cursor-pointer text-[15px] transition-all duration-300 bg-[#e5e7eb] text-[#333] font-semibold hover:bg-[#d1d5db] max-sm:w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
