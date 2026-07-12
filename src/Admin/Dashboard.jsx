import { useEffect, useState } from "react";
import "./dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard-container">

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h4>Total Sales</h4>
          <h2>Rs. {stats.totalSales}</h2>
          <p>Overall Store Revenue</p>
        </div>

        <div className="dashboard-card">
          <h4>Total Products</h4>
          <h2>{stats.totalProducts}</h2>
          <p>Products Available</p>
        </div>

        <div className="dashboard-card">
          <h4>Total Categories</h4>
          <h2>{stats.totalCategories}</h2>
          <p>Available Categories</p>
        </div>

        <div className="dashboard-card">
          <h4>Total Orders</h4>
          <h2>{stats.totalOrders}</h2>
          <p>Orders Received</p>
        </div>

      </div>

      <div className="dashboard-row">

        <div className="dashboard-chart">

          <h3>Sales Overview</h3>

          <div className="dashboard-placeholder">
            Sales Chart Will Be Added Here
          </div>

        </div>

        <div className="dashboard-latest">

          <h3>Recent Activity</h3>

          <div className="dashboard-placeholder">
            Recent Orders Will Appear Here
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;