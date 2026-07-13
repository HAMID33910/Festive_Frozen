import { useState, useEffect } from "react";
import "./deals.css";
import {
  FiPlus,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";

function Deals() {
  const [deals, setDeals] = useState([]);

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

  const [image, setImage] = useState(null);

  useEffect(() => {
    getDeals();
  }, []);

  const getDeals = () => {
    fetch("http://localhost:3001/api/deals")
      .then((res) => res.json())
      .then((data) => setDeals(data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const res = await fetch(
        "http://localhost:3001/api/deals",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save deal");
      }

      alert("Deal Added Successfully");

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

      getDeals();
    } catch (err) {
      console.log(err);
      alert("Error Saving Deal");
    }
  };

  const deleteDeal = async (id) => {
    if (!window.confirm("Delete this deal?")) return;

    try {
      await fetch(
        `http://localhost:3001/api/deals/${id}`,
        {
          method: "DELETE",
        }
      );

      getDeals();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="deals-page">
      <div className="deals-top">
        <h2>Manage Deals</h2>
      </div>

      <form
        className="deal-form"
        onSubmit={handleSubmit}
      >
        <div className="deal-grid">
          <div className="deal-field">
            <label>Deal Name</label>

            <input
              type="text"
              name="dealName"
              value={form.dealName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="deal-field">
            <label>Discount %</label>

            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="deal-field">
            <label>Original Price</label>

            <input
              type="number"
              name="originalPrice"
              value={form.originalPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="deal-field">
            <label>Discounted Price</label>

            <input
              type="number"
              name="discountedPrice"
              value={form.discountedPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="deal-field">
            <label>Start Date</label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="deal-field">
            <label>End Date</label>

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="deal-field">
            <label>Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="deal-field">
            <label>Deal Banner</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              required
            />
          </div>
        </div>

        <div className="deal-field">
          <label>Description</label>

          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button
          className="save-deal-btn"
          type="submit"
        >
          <FiPlus />
          Save Deal
        </button>
      </form>

      <div className="deals-list">

  <h2 style={{ marginBottom: "20px", color: "#1d232f" }}>
    All Deals
  </h2>

  <table className="deals-table">

    <thead>
      <tr>
        <th>Image</th>
        <th>Deal Name</th>
        <th>Discount</th>
        <th>Original Price</th>
        <th>Offer Price</th>
        <th>Start</th>
        <th>End</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>

      {deals.length === 0 ? (

        <tr>
          <td colSpan="9" style={{ textAlign: "center" }}>
            No Deals Found
          </td>
        </tr>

      ) : (

        deals.map((deal) => (

          <tr key={deal._id}>

            <td>

              <img
                className="deal-thumb"
                src={`http://localhost:3001/dealuploads/${deal.dealImage}`}
                alt={deal.dealName}
              />

            </td>

            <td>{deal.dealName}</td>

            <td>{deal.discount}%</td>

            <td>Rs. {deal.originalPrice}</td>

            <td>Rs. {deal.discountedPrice}</td>

            <td>{deal.startDate?.substring(0, 10)}</td>

            <td>{deal.endDate?.substring(0, 10)}</td>

            <td>

              <span
                className={
                  deal.status === "Active"
                    ? "status-active"
                    : "status-inactive"
                }
              >
                {deal.status}
              </span>

            </td>

            <td>

              <div className="deal-actions">

              <button
                className="deal-edit-btn"
                    >
                        <FiEdit />
                        </button>

                <button
                  className="deal-delete-btn"
                  onClick={() => deleteDeal(deal._id)}
                >
                  <FiTrash2 />
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
  );
}
export default Deals;