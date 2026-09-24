import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar.jsx";
import { API_URL } from "../config";

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
  FiImage,
  FiLogOut,
  FiBell,
  FiAlertTriangle,
  FiMenu,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function AdminPanel() {
  const [page, setPage] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      const res = await fetch(`${API_URL}/api/notifications`);
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

  const navItems = [
    { key: "dashboard", icon: <FiGrid />, label: "Dashboard" },
    { key: "orders", icon: <FiClipboard />, label: "Orders" },
    { key: "products", icon: <FiShoppingBag />, label: "Products" },
    { key: "categories", icon: <FiLayers />, label: "Categories" },
    { key: "deals", icon: <FiTag />, label: "Deals" },
    { key: "banners", icon: <FiImage />, label: "Hero Banners" },
  ];

  return (
    <>
      <Navbar />

      <div className="flex bg-admin-bg font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif]">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-screen w-[270px] bg-[#f0bf75] flex flex-col justify-between px-[22px] pt-[30px] pb-[30px] z-50 overflow-y-auto shrink-0 box-border transition-transform duration-300 md:sticky md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div>
            <div className="mb-2">
              <h2 className="text-[28px] font-bold text-[#8f3f16] m-0 mb-[5px]">Festive Frozen</h2>
              <p className="text-white text-sm m-0 opacity-90">Admin Panel</p>
            </div>

            <ul className="list-none p-0 m-0 flex flex-col gap-2 pt-[30px] pb-[30px]">
              {navItems.map((item) => (
                <li
                  key={item.key}
                  className={`flex items-center gap-[14px] py-[14px] px-4 rounded-xl cursor-pointer transition-all duration-[0.25s] text-[16px] font-medium text-white no-underline ${
                    page === item.key
                      ? "bg-[#8f3f16] font-semibold shadow-[0_4px_10px_rgba(143,63,22,0.2)]"
                      : "hover:bg-white/15"
                  }`}
                  onClick={() => {
                    setPage(item.key);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-[30px] overflow-y-auto max-md:p-5">
          <header className="flex justify-between items-center mb-[35px] gap-4 w-full max-md:mb-6">
            <div className="flex items-center gap-3">
              <button
                className="hidden max-md:flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm cursor-pointer border-none text-admin-text shrink-0"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <FiMenu />
              </button>
              <h2 className="text-[32px] text-admin-text m-0 font-bold max-sm:text-[24px]">
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </h2>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="relative" ref={bellRef}>
                <div
                  className="relative w-12 h-12 flex justify-center items-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-[0.25s] border-none text-admin-text hover:bg-[#8f3f16] hover:text-white max-sm:w-[42px] max-sm:h-[42px]"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FiBell />
                  {totalNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-[11px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-[9px] px-1 leading-none">
                      {totalNotifications}
                    </span>
                  )}
                </div>
                {showNotifications && (
                  <div className="absolute top-[calc(100%+10px)] right-0 w-[320px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-[1000] overflow-hidden border border-black/5">
                    <div className="py-3.5 px-[18px] border-b border-[#f0f0f0]">
                      <h4 className="m-0 text-[15px] font-bold text-admin-text">Notifications</h4>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.pendingOrders > 0 && (
                        <div className="flex items-center gap-3 py-3 px-[18px] text-sm text-admin-text border-b border-[#f5f5f5] text-[#2563eb]">
                          <FiClipboard className="shrink-0 text-lg" />
                          <span>
                            <strong>{notifications.pendingOrders}</strong> pending order{notifications.pendingOrders > 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                      {notifications.outOfStockProducts.length > 0 && (
                        <div className="flex items-center gap-3 py-3 px-[18px] text-sm text-admin-text border-b border-[#f5f5f5] text-[#dc2626]">
                          <FiAlertTriangle className="shrink-0 text-lg" />
                          <span>
                            <strong>{notifications.outOfStockProducts.length}</strong> product{notifications.outOfStockProducts.length > 1 ? "s" : ""} out of stock
                          </span>
                        </div>
                      )}
                      {notifications.lowStockProducts.filter(p => p.stock > 0).length > 0 && (
                        <div className="flex items-center gap-3 py-3 px-[18px] text-sm text-admin-text border-b border-[#f5f5f5] text-[#d97706]">
                          <FiAlertTriangle className="shrink-0 text-lg" />
                          <span>
                            <strong>{notifications.lowStockProducts.filter(p => p.stock > 0).length}</strong> product{notifications.lowStockProducts.filter(p => p.stock > 0).length > 1 ? "s" : ""} low on stock
                          </span>
                        </div>
                      )}
                      {totalNotifications === 0 && (
                        <div className="py-[30px] px-[18px] text-center text-[#999] text-sm">No new notifications</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="w-full">
            {renderPage()}
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminPanel;
