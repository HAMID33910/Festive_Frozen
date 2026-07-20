import { useEffect, useState } from "react";
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
      const res = await fetch("http://localhost:3001/api/dashboard");
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
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  const statCards = [
    { label: "Total Sales", value: `Rs. ${Number(stats.totalSales).toLocaleString()}`, sub: "Overall Store Revenue" },
    { label: "Total Products", value: stats.totalProducts, sub: "Products Available" },
    { label: "Total Categories", value: stats.totalCategories, sub: "Available Categories" },
    { label: "Total Orders", value: stats.totalOrders, sub: "Orders Received" },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-5 mb-8 max-xl:grid-cols-2 max-md:grid-cols-1">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="relative overflow-hidden bg-white rounded-2xl p-6 border border-[#f0e4dc] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            <div className="absolute left-0 top-0 w-full h-1.5 bg-gradient-to-r from-[#8f3f16] to-[#c46d2d]" />
            <h4 className="text-[#8f3f16] text-[13px] font-semibold mb-3 uppercase tracking-wider">{card.label}</h4>
            <h2 className="text-[#2b2b2b] text-[32px] mb-1 font-bold max-md:text-[26px]">{card.value}</h2>
            <p className="text-[#777] text-[14px]">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-5 max-xl:grid-cols-1">
        <div className="bg-white rounded-2xl p-6 border border-[#f0e4dc] shadow-[0_2px_10px_rgba(0,0,0,0.06)] max-md:p-5">
          <h3 className="text-[#8f3f16] text-[22px] font-bold mb-6">Sales Overview</h3>
          <div style={{ height: "350px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#f0e4dc] shadow-[0_2px_10px_rgba(0,0,0,0.06)] max-md:p-5">
          <h3 className="text-[#8f3f16] text-[22px] font-bold mb-6">Pending Orders</h3>
          {pendingOrders.length === 0 ? (
            <div className="h-[350px] max-md:h-[260px] border-2 border-dashed border-[#d8b8a3] rounded-2xl flex justify-center items-center bg-[#fffaf7] text-[#8f3f16] text-lg font-semibold">
              No Pending Orders
            </div>
          ) : (
            <ul className="list-none p-0 m-0">
              {pendingOrders.map((order) => (
                <li
                  key={order._id}
                  className="py-4 border-b border-[#f0f0f0] last:border-b-0 flex justify-between items-center text-[#555] transition-all duration-300 hover:pl-2 hover:text-[#8f3f16]"
                >
                  <div>
                    <strong className="text-[#333]">{order.firstName} {order.lastName}</strong>
                    <p className="m-0 text-sm">Rs. {Number(order.totalPrice).toLocaleString()}</p>
                  </div>
                  <span className="inline-flex py-1 px-3 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
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
