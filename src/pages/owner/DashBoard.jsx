import React, { useEffect, useState } from 'react';
import { DollarSign, BedDouble, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const getDashboardStats = () => {
  return Promise.resolve({
    data: { totalHotels: 12, totalBookings: 145, totalEarnings: 45200 }
  });
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 backdrop-blur-sm shadow-xl"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
        <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalHotels: 0, totalBookings: 0, totalEarnings: 0 });

  useEffect(() => {
    getDashboardStats().then(res => setStats(res.data));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={BedDouble} label="Total Hotels" value={stats.totalHotels} color="bg-blue-500" />
        <StatCard icon={CalendarCheck} label="Total Bookings" value={stats.totalBookings} color="bg-emerald-500" />
        <StatCard icon={DollarSign} label="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`} color="bg-purple-500" />
      </div>

      {/* Recent Activity / Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 h-80 flex flex-col justify-center items-center text-slate-500">
           {/* Placeholder for Recharts or Chart.js */}
           <div className="w-full h-40 flex items-end gap-2 px-10">
              {[40, 70, 30, 85, 50, 90, 60].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 bg-indigo-500/40 rounded-t-sm hover:bg-indigo-500 transition-colors"
                />
              ))}
           </div>
           <p className="mt-4 text-sm font-mono">Weekly Revenue Trends</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 h-80 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-white">Recent Activity</h3>
          <ul className="space-y-4">
             {[1,2,3].map(i => (
               <li key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                 <span className="text-slate-300">New booking for <span className="text-white font-medium">Ocean View Suite</span></span>
                 <span className="text-xs text-slate-500">2h ago</span>
               </li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;