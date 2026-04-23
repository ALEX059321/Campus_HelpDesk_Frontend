import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SuggestionForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('user'));
    const token = savedUser?.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    };

    toast.promise(
      axios.post('http://localhost:1200/api/v1/dashboard/suggestions/create', {
          title: formData.title,
          category: formData.category,
          description: formData.description
      }, config), 
      {
        loading: 'Submitting Suggestion...',
        success: (res) => {
          setFormData({ title: '', category: '', description: '' });
          setTimeout(() => navigate('/dashboard'), 1500);
          return "Suggestion Submitted Successfully!";
        },
        error: (err) => {
          return err.response?.data?.message || "Submission failed";
        }
      }
    );
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-[#f7f5f0] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-2xl bg-white shadow-sm border border-stone-200 rounded-lg p-8 md:p-10">
          
          <div className="mb-8 border-b border-stone-200 pb-5">
            <h2 className="text-3xl font-serif text-slate-800 mb-2">Share a Suggestion</h2>
            <p className="text-slate-600">Help us improve by sharing your ideas and feedback.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-colors bg-stone-50 focus:bg-white"
                placeholder="Brief summary of your suggestion"
                required
              />
            </div>

            {/* Category Field */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select 
                id="category" 
                name="category" 
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-colors bg-stone-50 focus:bg-white text-slate-700"
                required
              >
                <option value="" disabled>Select an area of improvement...</option>
                <option value="academics">Academics</option>
                <option value="facilities">Facilities & Infrastructure</option>
                <option value="events">Events & Activities</option>
                <option value="cafeteria">Cafeteria</option>
                <option value="library">Library</option>
                <option value="general">General / Other</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Details</label>
              <textarea 
                id="description" 
                name="description" 
                rows="8" 
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-colors bg-stone-50 focus:bg-white resize-y"
                placeholder="Please describe your suggestion in detail..."
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-medium text-lg py-3 px-4 rounded-md transition-all duration-200 shadow-sm focus:ring-4 focus:ring-slate-300 outline-none"
              >
                Submit Suggestion
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuggestionForm;
