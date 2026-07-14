import { useEffect, useState } from "react";
import "./dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
  });

  const [salesData, setSalesData] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/dashboard"
      );

      const data = await res.json();

      setStats({
        totalSales: data.totalSales || 0,
        totalProducts: data.totalProducts || 0,
        totalCategories: data.totalCategories || 0,
        totalOrders: data.totalOrders || 0,
      });

      setSalesData(data.salesGraph || []);

      setPendingOrders(data.pendingOrders || []);

    } catch (err) {
      console.log(err);
    }
  };

  const chartData = {
    labels: salesData.map((item) => item.month),

    datasets: [
      {
        label: "Sales",

        data: salesData.map((item) => item.sales),

        borderColor: "#8f3f16",

        backgroundColor: "rgba(143,63,22,.15)",

        borderWidth: 3,

        fill: true,

        tension: 0.4,

        pointRadius: 4,

        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h4>Total Sales</h4>

          <h2>
            Rs. {Number(stats.totalSales).toLocaleString()}
          </h2>

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

          <div
            style={{
              height: "350px",
            }}
          >
            <Line
              data={chartData}
              options={chartOptions}
            />
          </div>

        </div>

        <div className="dashboard-latest">

          <h3>Pending Orders</h3>

          {pendingOrders.length === 0 ? (

            <div className="dashboard-placeholder">

              No Pending Orders

            </div>

          ) : (

            <ul className="recent-orders-list">

              {pendingOrders.map((order) => (

                <li
                  key={order._id}
                >

                  <div>

                    <strong>

                      {order.firstName}{" "}
                      {order.lastName}

                    </strong>

                    <p>

                      Rs.{" "}
                      {Number(
                        order.totalPrice
                      ).toLocaleString()}

                    </p>

                  </div>

                  <span className="pending-badge">

                    Pending

                  </span>

                </li>

              ))}

            </ul>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;