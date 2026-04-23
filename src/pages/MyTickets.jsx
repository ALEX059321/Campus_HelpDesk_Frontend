import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const MyTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const handleCommentChange = (ticketId, text) => {
    setCommentTexts(prev => ({ ...prev, [ticketId]: text }));
  };

  const submitComment = async (ticketId) => {
    const text = commentTexts[ticketId];
    if (!text || text.trim() === '') return;
    
    try {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      const token = savedUser?.token;
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
      const response = await axios.post(`http://localhost:1200/api/v1/dashboard/tickets/${ticketId}/comments`, { text }, config);
      
      if (response.data.success) {
        setTickets(prevTickets => prevTickets.map(ticket => {
          if (ticket._id === ticketId) {
            return {
              ...ticket,
              comments: [...(ticket.comments || []), response.data.comment]
            };
          }
          return ticket;
        }));
        setCommentTexts(prev => ({ ...prev, [ticketId]: '' }));
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const token = savedUser?.token;

        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:1200/api/v1/dashboard/user', config);
        
        const sortedTickets = (response.data.tickets || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTickets(sortedTickets);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError(err.response?.data?.message || "Failed to fetch tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'not_resolved': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'low': return 'bg-slate-100 text-slate-600';
      case 'medium': return 'bg-orange-100 text-orange-600';
      case 'high': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] p-6 font-sans">
      <div className="max-w-5xl mx-auto mt-8">
        <div className="mb-8 border-b border-stone-200 pb-5">
          <h2 className="text-3xl font-serif text-slate-800 mb-2">My Tickets</h2>
          <p className="text-slate-600">Track and manage all the tickets you've raised.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {tickets.length === 0 && !error ? (
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-12 text-center transform transition-all hover:scale-[1.01] duration-300">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No tickets found</h3>
            <p className="text-slate-500">You haven't raised any tickets yet.</p>
            <a href="/Create_Ticket" className="inline-block mt-6 px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors">
              Raise a Ticket
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {tickets.map(ticket => (
              <div key={ticket._id} className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 transition-all hover:shadow-md hover:border-slate-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{ticket.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Raised on {new Date(ticket.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(ticket.status || 'new')}`}>
                      {(ticket.status || 'new').replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded font-medium mb-3">
                    Category: {ticket.category}
                  </span>
                  <p className="text-slate-600 bg-stone-50 p-4 rounded-lg border border-stone-100 whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                </div>

                {/* Show comments if they exist */}
                {ticket.comments && ticket.comments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Updates ({ticket.comments.length})
                    </h4>
                    <div className="space-y-3">
                      {ticket.comments.map((comment, index) => (
                        <div key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-slate-700">{comment.CommentedBy || 'Support'}</span>
                            <span className="text-xs text-slate-500">
                              {new Date(comment.commenetedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Comment Input */}
                <div className="mt-4 pt-4 border-t border-stone-100 flex gap-2">
                  <input
                    type="text"
                    value={commentTexts[ticket._id] || ''}
                    onChange={(e) => handleCommentChange(ticket._id, e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitComment(ticket._id); }}
                    placeholder="Add a comment to this ticket..."
                    className="flex-1 px-3 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-colors text-sm bg-stone-50 focus:bg-white"
                  />
                  <button 
                    onClick={() => submitComment(ticket._id)}
                    disabled={!commentTexts[ticket._id]?.trim()}
                    className="bg-slate-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
