import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Statistics = () => {
  const [tickets, setTickets] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:1200/api/v1/public/statistics');
        
        if (res.data.success) {
          setTickets(res.data.tickets || []);
          setUsersCount(res.data.users?.length || 0);
        }
      } catch (err) {
        console.error("Error fetching statistics data:", err);
        toast.error("Failed to fetch statistics data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //Weekly Data
  const processWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    
    const dataMap = {};
    days.forEach(day => {
      dataMap[day] = { name: day, thisWeek: 0, lastWeek: 0 };
    });

    const now = new Date();
    // monday = 1, sunday = 0
    const dayOfWeek = now.getDay(); 
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const thisWeekMonday = new Date(now);
    thisWeekMonday.setDate(now.getDate() - daysSinceMonday);
    thisWeekMonday.setHours(0, 0, 0, 0);

    const lastWeekMonday = new Date(thisWeekMonday);
    lastWeekMonday.setDate(thisWeekMonday.getDate() - 7);

    tickets.forEach(ticket => {
      if (ticket.createdAt) {
        const date = new Date(ticket.createdAt);
        const ticketDay = date.getDay();
        const dayName = ticketDay === 0 ? 'Sun' : days[ticketDay - 1];

        if (date >= thisWeekMonday) {
          dataMap[dayName].thisWeek += 1;
        } else if (date >= lastWeekMonday && date < thisWeekMonday) {
          dataMap[dayName].lastWeek += 1;
        }
      }
    });

    return Object.values(dataMap);
  };


  const processCategoryData = () => {
    const categoryCounts = {};
    tickets.forEach(ticket => {
      const cat = ticket.category || 'Others';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

  
    const data = Object.keys(categoryCounts).map(key => ({
      name: key,
      value: categoryCounts[key]
    }));

    //dummy chart if no data is present
    return data.length > 0 ? data : [
        { name: 'Technical', value: 0 },
        { name: 'Hostel', value: 0 },
        { name: 'Academic', value: 0 },
        { name: 'Others', value: 0 },
      ];
  };

  const weeklyData = processWeeklyData();
  const categoryData = processCategoryData();

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

  const totalRaised = tickets.length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
  const pendingCount = tickets.filter(t => t.status !== 'resolved').length;
  const urgentCount = tickets.filter(t => t.priority?.toLowerCase() === 'critical').length;

  const stats = [
    { label: 'Tickets Raised', value: totalRaised.toLocaleString(), icon: <FileText size={24} />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Resolved', value: resolvedCount.toLocaleString(), icon: <CheckCircle size={24} />, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending', value: pendingCount.toLocaleString(), icon: <Clock size={24} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Urgent', value: urgentCount.toLocaleString(), icon: <AlertCircle size={24} />, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-xl font-medium text-gray-500 flex items-center gap-2">
          <Clock className="animate-spin" size={24} />
          Loading statistics...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-8">System Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`p-3 rounded-lg ${item.bg} ${item.color} mr-4`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Weekly Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Requests</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="thisWeek" name="This Week" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lastWeek" name="Last Week" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Request Categories</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center text-xs">
                <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;