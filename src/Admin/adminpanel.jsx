import { useState } from "react";
import "./adminpanel.css";
import Navbar from "../navbar";

import Dashboard from "./Dashboard.jsx";
import Products from "./Products.jsx";
import Categories from "./Categories.jsx";
import Orders from "./Orders.jsx";
import Deals from "./Deals.jsx";
// import Footer from "../footer.jsx"
// import Settings from "./Settings";

import {
  FiGrid,
  FiShoppingBag,
  FiLayers,
  FiClipboard,
  FiTag,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function AdminPanel() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;

      case "products":
        return <Products />;

      case "categories":
        return <Categories />;

      case "orders":
        return <Orders />;

      case "deals":
        return <Deals />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-dashboard">

        <aside className="admin-sidebar">

          <div className="admin-logo">
            <h2>Festive Frozen</h2>
            <p>Admin Panel</p>
          </div>

          <ul>

            <li
              className={page === "dashboard" ? "active" : ""}
              onClick={() => setPage("dashboard")}
            >
              <FiGrid />
              Dashboard
            </li>

            <li
              className={page === "products" ? "active" : ""}
              onClick={() => setPage("products")}
            >
              <FiShoppingBag />
              Products
            </li>

            <li
              className={page === "categories" ? "active" : ""}
              onClick={() => setPage("categories")}
            >
              <FiLayers />
              Categories
            </li>

            <li
              className={page === "orders" ? "active" : ""}
              onClick={() => setPage("orders")}
            >
              <FiClipboard />
              Orders
            </li>

           {/* <li
              className={page === "deals" ? "active" : ""}
                onClick={() => setPage("deals")}
                    >
                  <FiUsers />
                      Deals
                        </li> */}

                        <li
                    className={page === "deals" ? "active" : ""}
                       onClick={() => setPage("deals")}
                          >
                      <FiTag />
                       Deals
                          </li>

            <li
              className={page === "settings" ? "active" : ""}
              onClick={() => setPage("settings")}
            >
              <FiSettings />
              Settings
            </li>

          </ul>

          {/* <Link to="/LoginScreen">

            <button className="admin-logout">

              <FiLogOut />

              Logout

            </button>

          </Link> */}

        </aside>

        <main className="admin-main">

          <header className="admin-header">

            <h2>
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </h2>

            <div className="admin-header-right">

              <div className="admin-search">

                <FiSearch />

                <input
                  type="text"
                  placeholder={`Search ${page}...`}
                />

              </div>

              <div className="admin-bell">

                <FiBell />

              </div>

            </div>

          </header>

          <div className="admin-page-content">

            {renderPage()}

          </div>

        </main>

      </div>
      {/* <Footer/> */}
    </>
  );
}

export default AdminPanel;