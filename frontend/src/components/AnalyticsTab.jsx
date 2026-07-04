import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "../lib/axios";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="brand"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="blue"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="amber"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Chart */}
      <motion.div
        className="glass-light rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className="text-lg font-semibold text-white mb-6">
          Sales & Revenue Overview
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#f1f5f9",
                fontSize: "13px",
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              strokeWidth={2}
              activeDot={{ r: 6, fill: "#10B981", strokeWidth: 0 }}
              name="Sales"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              strokeWidth={2}
              activeDot={{ r: 6, fill: "#8B5CF6", strokeWidth: 0 }}
              name="Revenue"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const colorMap = {
  brand: {
    bg: "bg-brand-500/10",
    icon: "text-brand-400",
    label: "text-brand-400",
  },
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    label: "text-blue-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    icon: "text-amber-400",
    label: "text-amber-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    label: "text-purple-400",
  },
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
  const colors = colorMap[color] || colorMap.brand;

  return (
    <motion.div
      className="glass-light rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
        <div>
          <p className="text-sm text-surface-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-0.5">{value}</h3>
        </div>
      </div>
    </motion.div>
  );
};
