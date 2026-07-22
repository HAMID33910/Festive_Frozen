import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { API_URL } from "../config";

function Deals() {
  const [deals, setDeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    dealName: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    discount: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  useEffect(() => {
    getDeals();
  }, []);

  const getDeals = async () => {
    try {
      const res = await fetch(`${API_URL}/api/deals`);
      const data = await res.json();
      setDeals(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "dealImage") {
      setImage(e.target.files[0]);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editId && !image) {
      alert("Please select a deal banner image");
      return;
    }

    const formData = new FormData();
    formData.append("dealName", form.dealName);
    formData.append("description", form.description);
    formData.append("originalPrice", form.originalPrice);
    formData.append("discountedPrice", form.discountedPrice);
    formData.append("discount", form.discount);
    formData.append("startDate", form.startDate);
    formData.append("endDate", form.endDate);
    formData.append("status", form.status);
    if (image) {
      formData.append("dealImage", image);
    }

    try {
      const url = editId
        ? `${API_URL}/api/deals/${editId}`
        : `${API_URL}/api/deals`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });

      if (!res.ok) throw new Error("Failed to save deal");

      alert(editId ? "Deal Updated Successfully" : "Deal Added Successfully");
      getDeals();
      resetForm();
    } catch (err) {
      console.log(err);
      alert("Error Saving Deal");
    }
  };

  const editDeal = (deal) => {
    setEditId(deal._id);
    setForm({
      dealName: deal.dealName,
      description: deal.description,
      originalPrice: deal.originalPrice,
      discountedPrice: deal.discountedPrice,
      discount: deal.discount,
      startDate: deal.startDate.substring(0, 10),
      endDate: deal.endDate.substring(0, 10),
      status: deal.status,
    });
    setImage(null);
    setShowModal(true);
  };

  const deleteDeal = async (id) => {
    if (!window.confirm("Delete this deal?")) return;
    try {
      await fetch(`${API_URL}/api/deals/${id}`, { method: "DELETE" });
      getDeals();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setForm({
      dealName: "",
      description: "",
      originalPrice: "",
      discountedPrice: "",
      discount: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });
    setImage(null);
    setEditId(null);
    setShowModal(false);
  };

  const inputClass = "w-full py-3 px-4 border border-[#ddd] rounded-xl outline-none text-[15px] transition-all duration-300 box-border focus:border-[#8f3f16] focus:ring-2 focus:ring-[#8f3f16]/20";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <h2 className="text-xl font-bold text-admin-text">Manage Deals</h2>
        <button
          className="flex items-center gap-2 bg-[#8f3f16] text-white border-none rounded-xl py-3 px-5 text-[15px] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#74310f] max-sm:w-full max-sm:justify-center"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus />
          Add Deal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-[#8f3f16] text-white">
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Image</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Deal Name</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Discount</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Original</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Offer</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Start</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">End</th>
                <th className="py-3.5 px-5 text-left text-[13px] font-semibold uppercase tracking-wider">Status</th>
                <th className="py-3.5 px-5 text-center text-[13px] font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-[#999] text-sm">
                    No deals found
                  </td>
                </tr>
              ) : (
                deals.map((deal) => (
                  <tr
                    key={deal._id}
                    className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafaf9] transition-colors"
                  >
                    <td className="py-3 px-5">
                      <img
                        className="w-14 h-14 object-cover rounded-lg"
                        src={`${API_URL}/dealuploads/${deal.dealImage}`}
                        alt={deal.dealName}
                      />
                    </td>
                    <td className="py-3 px-5 text-sm font-medium text-[#333]">{deal.dealName}</td>
                    <td className="py-3 px-5 text-sm text-[#555]">{deal.discount}%</td>
                    <td className="py-3 px-5 text-sm text-[#555]">Rs. {deal.originalPrice}</td>
                    <td className="py-3 px-5 text-sm text-[#333] font-medium">Rs. {deal.discountedPrice}</td>
                    <td className="py-3 px-5 text-sm text-[#555]">{deal.startDate?.substring(0, 10)}</td>
                    <td className="py-3 px-5 text-sm text-[#555]">{deal.endDate?.substring(0, 10)}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-block py-1 px-3 rounded-full text-[13px] font-semibold ${
                          deal.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {deal.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="w-9 h-9 border-none rounded-lg text-white flex justify-center items-center cursor-pointer transition-all duration-200 bg-[#3b82f6] hover:bg-[#2563eb] hover:-translate-y-0.5"
                          onClick={() => editDeal(deal)}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          className="w-9 h-9 border-none rounded-lg text-white flex justify-center items-center cursor-pointer transition-all duration-200 bg-[#dc2626] hover:bg-[#b91c1c] hover:-translate-y-0.5"
                          onClick={() => deleteDeal(deal._id)}
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
          <div className="w-[600px] max-w-[95%] max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-[30px] shadow-2xl max-sm:p-5">
            <h2 className="mb-6 text-admin-text font-bold text-xl">
              {editId ? "Update Deal" : "Add Deal"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="dealName"
                placeholder="Deal Name"
                value={form.dealName}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount %"
                value={form.discount}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="number"
                name="originalPrice"
                placeholder="Original Price"
                value={form.originalPrice}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="number"
                name="discountedPrice"
                placeholder="Discounted Price"
                value={form.discountedPrice}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className={`${inputClass} min-h-[100px] resize-none`}
              />
              <input
                type="file"
                name="dealImage"
                accept="image/*"
                onChange={handleChange}
                className={inputClass}
              />
              <div className="flex justify-end gap-3 mt-2 max-sm:flex-col">
                <button
                  type="submit"
                  className="border-none py-3 px-6 rounded-xl text-[15px] cursor-pointer transition-all duration-300 bg-[#8f3f16] text-white font-semibold hover:bg-[#74310f] max-sm:w-full"
                >
                  {editId ? "Update Deal" : "Save Deal"}
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

export default Deals;
