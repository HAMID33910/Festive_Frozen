import { useState, useEffect, useRef } from "react";
import "./adminpanel.css";
import Navbar from "../navbar";

import Dashboard from "./Dashboard.jsx";
import Products from "./Products.jsx";
import Categories from "./Categories.jsx";
import Orders from "./Orders.jsx";
import Deals from "./Deals.jsx";
import Banners from "./Banners.jsx";

import {
  FiGrid,
  FiShoppingBag,
  FiLayers,
  FiClipboard,
  FiTag,
  FiSettings,
  FiLogOut,
  FiBell,
  FiAlertTriangle,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function AdminPanel() {
  const [page, setPage] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState({
    pendingOrders: 0,
    lowStockProducts: [],
    outOfStockProducts: [],
  });
  const bellRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalNotifications =
    notifications.pendingOrders + notifications.outOfStockProducts.length + notifications.lowStockProducts.length;

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

      case "banners":
  return <Banners />;

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
  className={page === "banners" ? "active" : ""}
  onClick={() => setPage("banners")}
>
  <FiSettings />
  Hero Banners
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
              <div className="admin-bell-wrapper" ref={bellRef}>
                <div
                  className="admin-bell"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FiBell />
                  {totalNotifications > 0 && (
                    <span className="admin-bell-badge">{totalNotifications}</span>
                  )}
                </div>
                {showNotifications && (
                  <div className="admin-notifications-dropdown">
                    <div className="admin-notifications-header">
                      <h4>Notifications</h4>
                    </div>
                    <div className="admin-notifications-body">
                      {notifications.pendingOrders > 0 && (
                        <div className="admin-notif-item admin-notif-order">
                          <FiClipboard />
                          <span>
                            <strong>{notifications.pendingOrders}</strong> pending order{notifications.pendingOrders > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                      {notifications.outOfStockProducts.length > 0 && (
                        <div className="admin-notif-item admin-notif-danger">
                          <FiAlertTriangle />
                          <span>
                            <strong>{notifications.outOfStockProducts.length}</strong> product{notifications.outOfStockProducts.length > 1 ? "s" : ""} out of stock
                          </span>
                        </div>
                      )}
                      {notifications.lowStockProducts.filter(p => p.stock > 0).length > 0 && (
                        <div className="admin-notif-item admin-notif-warning">
                          <FiAlertTriangle />
                          <span>
                            <strong>{notifications.lowStockProducts.filter(p => p.stock > 0).length}</strong> product{notifications.lowStockProducts.filter(p => p.stock > 0).length > 1 ? "s" : ""} low on stock
                          </span>
                        </div>
                      )}
                      {totalNotifications === 0 && (
                        <div className="admin-notif-empty">No new notifications</div>
                      )}
                    </div>
                  </div>
                )}
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