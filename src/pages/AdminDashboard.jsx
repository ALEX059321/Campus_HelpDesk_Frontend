import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { Shield, Users, FileText, AlertTriangle, Trash2, CheckCircle, ChevronDown } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('tickets');
  
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConfig = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return { headers: { Authorization: `Bearer ${savedUser?.token}` } };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = fetchConfig();
      const [ticketsRes, usersRes, suggestionsRes, reportsRes] = await Promise.allSettled([
        axios.get('http://localhost:1200/api/v1/admin/dashboard/all-tickets', config),
        axios.get('http://localhost:1200/api/v1/admin/dashboard/all-users', config),
        axios.get('http://localhost:1200/api/v1/admin/dashboard/all-suggestions', config),
        axios.get('http://localhost:1200/api/v1/admin/dashboard/all-reports', config)
      ]);

      if (ticketsRes.status === 'fulfilled') setTickets(ticketsRes.value.data.tickets || []);
      if (usersRes.status === 'fulfilled') setUsers(usersRes.value.data.users || []);
      if (suggestionsRes.status === 'fulfilled') setSuggestions(suggestionsRes.value.data.suggestions || []);
      if (reportsRes.status === 'fulfilled') setReports(reportsRes.value.data.reports || []);

    } catch (err) {
      console.error("Error fetching admin data:", err);
      toast.error("Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await axios.delete(`http://localhost:1200/api/v1/admin/dashboard/delete/${ticketId}`, fetchConfig());
      toast.success("Ticket deleted successfully");
      setTickets(tickets.filter(t => t._id !== ticketId));
    } catch (err) {
      toast.error("Failed to delete ticket");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    try {
      await axios.delete(`http://localhost:1200/api/v1/admin/dashboard/delete-user/${userId}`, fetchConfig());
      toast.success("User deleted successfully");
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this incident report? This action cannot be undone.")) return;
    try {
      await axios.delete(`http://localhost:1200/api/v1/admin/dashboard/delete-report/${reportId}`, fetchConfig());
      toast.success("Report deleted successfully");
      setReports(reports.filter(r => r._id !== reportId));
    } catch (err) {
      toast.error("Failed to delete report");
    }
  };

  const handleUpdateStatus = async (ticketId, status) => {
    try {
      await axios.patch(`http://localhost:1200/api/v1/admin/dashboard/${ticketId}/status`, { status }, fetchConfig());
      toast.success(`Status updated to ${status}`);
      setTickets(tickets.map(t => t._id === ticketId ? { ...t, status } : t));
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Critical: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Toaster position="top-right" />
      
      {/* Top Navbar */}
      <nav className="bg-slate-900 text-white px-8 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-black tracking-widest">ADMIN PANEL</h1>
        </div>
        <Link to="/admin/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-lg transition-colors flex items-center gap-2">
          <Shield size={16} /> Add an Admin
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 pb-2">
          {[
            { id: 'tickets', label: 'Tickets', icon: <CheckCircle size={18} /> },
            { id: 'users', label: 'Users', icon: <Users size={18} /> },
            { id: 'suggestions', label: 'Suggestions', icon: <FileText size={18} /> },
            { id: 'reports', label: 'Incident Reports', icon: <AlertTriangle size={18} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold text-sm transition-all border-b-4 ${activeTab === tab.id ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-slate-400 font-medium">Loading data...</div>
          ) : (
            <>
              {/* TICKETS TAB */}
              {activeTab === 'tickets' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Active Tickets ({tickets.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map(ticket => (
                      <div key={ticket._id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow relative">
                        <button onClick={() => handleDeleteTicket(ticket._id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                        <div className="mb-2">
                          <h3 className="font-bold text-lg text-slate-800 pr-8 truncate">{ticket.title}</h3>
                          <p className="text-xs font-semibold text-slate-400">Raised by: <span className="text-indigo-600">{ticket.createdBy?.name || 'Unknown Student'}</span></p>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">{ticket.category}</p>
                        <p className="text-sm text-slate-700 line-clamp-3 mb-6 bg-slate-50 p-3 rounded">{ticket.description}</p>
                        
                        {ticket.comments && ticket.comments.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">User Comments</h4>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {ticket.comments.map((comment, index) => (
                                <div key={index} className="bg-slate-50 p-2 rounded border border-slate-100 text-sm">
                                  <p className="text-slate-800">{comment.text}</p>
                                  <span className="text-[10px] text-slate-400 font-semibold">{new Date(comment.commentedAt).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${priorityColors[ticket.priority] || 'bg-slate-100 text-slate-800'}`}>
                            {ticket.priority} Priority
                          </span>
                          
                          <div className="relative group">
                            <select 
                              className={`appearance-none text-xs font-bold px-3 py-1.5 rounded-full outline-none cursor-pointer border ${ticket.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                              value={ticket.status}
                              onChange={(e) => handleUpdateStatus(ticket._id, e.target.value)}
                            >
                              <option value="new">New</option>
                              <option value="in progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                              <option value="assigned">Assigned</option>
                              <option value="not_resolved">Not Resolved</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* USERS TAB */}
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Registered Students ({users.length})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                          <th className="py-4 px-6 font-semibold">Name</th>
                          <th className="py-4 px-6 font-semibold">Email</th>
                          <th className="py-4 px-6 font-semibold">Role</th>
                          <th className="py-4 px-6 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-4 px-6 font-medium text-slate-800">{u.name}</td>
                            <td className="py-4 px-6 text-slate-600">{u.email}</td>
                            <td className="py-4 px-6">
                              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{u.role}</span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button onClick={() => handleDeleteUser(u._id)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded text-sm font-semibold transition-colors">
                                Delete User
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUGGESTIONS TAB */}
              {activeTab === 'suggestions' && (
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Student Suggestions ({suggestions.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {suggestions.map(sugg => (
                      <div key={sugg._id} className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">{sugg.category}</span>
                          <span className="text-xs text-slate-400">{new Date(sugg.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">{sugg.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{sugg.description}</p>
                        <div className="text-xs text-slate-500 font-medium">By: {sugg.createdBy?.name || 'Unknown'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REPORTS TAB */}
              {activeTab === 'reports' && (
                <div>
                  <h2 className="text-xl font-bold text-red-700 mb-6 border-b border-red-100 pb-2 flex items-center gap-2">
                    <AlertTriangle size={20} /> Highly Confidential Incident Reports ({reports.length})
                  </h2>
                  <div className="space-y-4">
                    {reports.map(report => (
                      <div key={report._id} className="border-l-4 border-red-600 bg-red-50/30 p-6 rounded-r-xl shadow-sm relative">
                        <button onClick={() => handleDeleteReport(report._id)} className="absolute top-4 right-4 text-red-400 hover:text-red-700 transition-colors">
                          <Trash2 size={18} />
                        </button>
                        <div className="flex justify-between items-center mb-3 pr-8">
                          <h3 className="font-black text-red-900 text-lg">{report.incidentType}</h3>
                          <span className="text-xs font-bold bg-red-100 text-red-800 px-3 py-1 rounded-full uppercase tracking-wider">{report.status}</span>
                        </div>
                        <p className="text-slate-800 mb-4 bg-white p-4 rounded border border-red-100 shadow-inner">{report.details}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-white p-3 rounded border border-slate-100">
                          <div><span className="text-slate-400 block text-xs uppercase font-bold">Reporter</span> <span className="font-medium text-slate-700">{report.name}</span></div>
                          <div><span className="text-slate-400 block text-xs uppercase font-bold">Age</span> <span className="font-medium text-slate-700">{report.age}</span></div>
                          <div><span className="text-slate-400 block text-xs uppercase font-bold">Gender</span> <span className="font-medium text-slate-700">{report.gender}</span></div>
                          <div><span className="text-slate-400 block text-xs uppercase font-bold">Contact</span> <span className="font-medium text-slate-700 truncate">{report.email}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
