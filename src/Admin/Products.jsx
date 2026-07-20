import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    productTitle: "",
    productPrice: "",
    categoryId: "",
    description: "",
    stock: "",
    productImage: null,
  });

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      setForm({ ...form, productImage: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editId && !form.productImage) {
      alert("Select product image");
      return;
    }

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) {
        data.append(key, form[key]);
      }
    });

    try {
      const url = editId
        ? `http://localhost:3001/api/products/${editId}`
        : "http://localhost:3001/api/products";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, body: data });
      const result = await res.json();

      if (res.ok) {
        getProducts();
        resetForm();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setEditId(product._id);
    setForm({
      productTitle: product.productTitle,
      productPrice: product.productPrice,
      categoryId: product.categoryId?._id || "",
      description: product.description,
      stock: product.stock,
      productImage: null,
    });
    setShowModal(true);
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/products/${id}`, { method: "DELETE" });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setForm({
      productTitle: "",
      productPrice: "",
      categoryId: "",
      description: "",
      stock: "",
      productImage: null,
    });
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <h2 className="text-xl font-bold text-admin-text">Products</h2>
        <button
          className="flex items-center gap-2 bg-[#8f3f16] text-white border-none rounded-xl py-3 px-5 text-[15px] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#74310f] max-sm:w-full max-sm:justify-center"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#8f3f16] text-white">
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Image</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Name</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Price</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Category</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Stock</th>
                <th className="py-3.5 px-5 text-center text-[13px] font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#999] text-sm">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 px-5">
                      <img
                        src={`http://localhost:3001/productuploads/${product.productImage}`}
                        alt=""
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-3 px-5 text-sm font-medium text-[#333]">{product.productTitle}</td>
                    <td className="py-3 px-5 text-sm text-[#333]">Rs. {Number(product.productPrice).toLocaleString()}</td>
                    <td className="py-3 px-5 text-sm text-[#555]">{product.categoryId?.title}</td>
                    <td className="py-3 px-5 text-sm text-[#555]">{product.stock}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="w-9 h-9 flex items-center justify-center border-none rounded-lg cursor-pointer text-white bg-[#3b82f6] hover:bg-[#2563eb] transition-all duration-200 hover:-translate-y-0.5"
                          onClick={() => editProduct(product)}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          className="w-9 h-9 flex items-center justify-center border-none rounded-lg cursor-pointer text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-all duration-200 hover:-translate-y-0.5"
                          onClick={() => deleteProduct(product._id)}
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
          <div className="w-[550px] max-w-[95%] bg-white rounded-2xl p-[30px] shadow-2xl max-sm:p-5">
            <h2 className="mb-6 text-admin-text font-bold text-xl">
              {editId ? "Update Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="productTitle"
                placeholder="Product Name"
                value={form.productTitle}
                onChange={handleChange}
                required
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] transition-all duration-300 box-border focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              />
              <input
                type="number"
                name="productPrice"
                placeholder="Price"
                value={form.productPrice}
                onChange={handleChange}
                required
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] transition-all duration-300 box-border focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              />
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] transition-all duration-300 box-border focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] transition-all duration-300 box-border min-h-[120px] resize-none focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] transition-all duration-300 box-border focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              />
              <input
                type="file"
                name="productImage"
                onChange={handleChange}
                className="w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] transition-all duration-300 box-border focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20"
              />
              <div className="flex justify-end gap-3 mt-2 max-sm:flex-col">
                <button
                  type="submit"
                  className="border-none py-3 px-6 rounded-xl text-[15px] cursor-pointer transition-all duration-300 bg-[#8f3f16] text-white font-semibold hover:bg-[#74310f] max-sm:w-full"
                >
                  {editId ? "Update Product" : "Save Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border-none py-3 px-6 rounded-xl text-[15px] cursor-pointer transition-all duration-300 bg-[#e5e7eb] text-[#333] font-semibold hover:bg-[#d1d5db] max-sm:w-full"
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

export default Products;
