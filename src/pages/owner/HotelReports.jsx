import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Calendar, DollarSign, Users, TrendingUp, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { getHotelReport } from "../../api/ownerHotel";

const HotelReports = () => {
  const { hotelId } = useParams();

  // State for filters and data
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0], // Last 30 days
    endDate: new Date().toISOString().split("T")[0],
  });

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Data Fetching (Replace with actual API call)
  useEffect(() => {
    setLoading(true);
    // OwnerService.getReports(hotelId, filters.startDate, filters.endDate).then(...)
    try {
      const res = getHotelReport(hotelId, filters.startDate, filters.endDate);

    } catch (err) {
      throw err;
    }

    // Simulating API Latency
    setTimeout(() => {
      setReportData({
        totalRevenue: 12450,
        totalBookings: 32,
        avgDailyRate: 389,
        occupancyRate: 78,
        // Mocking daily revenue data for the chart
        dailyRevenue: Array.from({ length: 14 }).map((_, i) => ({
          date: `Nov ${i + 1}`,
          amount: Math.floor(Math.random() * (1200 - 400) + 400), // Random amount between 400-1200
        })),
      });
      setLoading(false);
    }, 600);
  }, [hotelId, filters]);

  // Handle Input Change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // --- Helper for Custom SVG Chart ---
  // Calculates the Y position for a point on the chart based on the max value
  const getY = (val, max, height) => height - (val / max) * height;

  const chartHeight = 200;
  const chartWidth = 100; // Percent
  const maxRevenue = reportData
    ? Math.max(...reportData.dailyRevenue.map((d) => d.amount)) * 1.2
    : 0;

  // Generate SVG Path
  const areaPath = useMemo(() => {
    if (!reportData) return "";
    const data = reportData.dailyRevenue;
    const stepX = 100 / (data.length - 1);

    let pathD = `M0,${getY(data[0].amount, maxRevenue, chartHeight)} `;
    data.forEach((d, i) => {
      pathD += `L${i * stepX},${getY(d.amount, maxRevenue, chartHeight)} `;
    });
    return pathD;
  }, [reportData, maxRevenue]);

  if (loading)
    return (
      <div className="text-slate-400 p-10 animate-pulse">
        Generating analytics...
      </div>
    );

  return (
    <div className="space-y-8">
      {/* 1. Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Performance Reports</h1>
          <p className="text-slate-400 text-sm">
            Revenue analytics and occupancy stats.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
          <Filter size={16} className="text-slate-500 ml-2" />
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="bg-transparent text-slate-300 text-sm focus:outline-none focus:text-white"
          />
          <span className="text-slate-600">-</span>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="bg-transparent text-slate-300 text-sm focus:outline-none focus:text-white"
          />
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Revenue"
          value={`$${reportData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="text-emerald-400"
          trend="+12%"
        />
        <MetricCard
          label="Bookings"
          value={reportData.totalBookings}
          icon={Calendar}
          color="text-blue-400"
          trend="+4"
        />
        <MetricCard
          label="Avg Daily Rate"
          value={`$${reportData.avgDailyRate}`}
          icon={TrendingUp}
          color="text-purple-400"
          trend="+2.5%"
        />
        <MetricCard
          label="Occupancy"
          value={`${reportData.occupancyRate}%`}
          icon={Users}
          color="text-orange-400"
          trend="-1%"
        />
      </div>

      {/* 3. Revenue Chart Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Revenue Trends</h3>
          <div className="flex gap-2">
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
              Gross Income
            </span>
          </div>
        </div>

        {/* Custom Responsive SVG Chart */}
        <div className="relative h-[250px] w-full">
          <svg
            viewBox={`0 0 100 ${chartHeight}`}
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 50, 100, 150, 200].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#334155"
                strokeWidth="0.5"
                strokeDasharray="2"
              />
            ))}

            {/* Area Fill */}
            <motion.path
              initial={{ d: `M0,${chartHeight} L100,${chartHeight}` }}
              animate={{
                d: `${areaPath} L100,${chartHeight} L0,${chartHeight} Z`,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              fill="url(#gradient)"
            />

            {/* Stroke Line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, d: areaPath }}
              transition={{ duration: 2, ease: "easeOut" }}
              fill="none"
              stroke="#818cf8"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* X-Axis Labels */}
          <div className="flex justify-between mt-2 text-xs text-slate-500 px-1">
            {reportData.dailyRevenue
              .filter((_, i) => i % 2 === 0)
              .map((d, i) => (
                <span key={i}>{d.date}</span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for consistency
const MetricCard = ({ label, value, icon: Icon, color, trend }) => {
  const isPositive = trend.startsWith("+");
  return (
    <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg bg-slate-800 ${color}`}>
          <Icon size={20} />
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {trend}
        </span>
      </div>
      <div>
        <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider">
          {label}
        </p>
        <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
      </div>
    </div>
  );
};

export default HotelReports;
