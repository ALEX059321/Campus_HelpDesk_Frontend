import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext'; 
import {useNavigate} from 'react-router-dom'; 
const Create_Ticket = (req, res) => {
  console.log("BODY RECEIVED:", req.body);
 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });
console.log("FORM DATA IN REACT:", formData);
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

 
  console.log("Checking form data before send:", formData);

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    },
  };
   
  toast.promise(
    
    axios.post('https://campus-help-desk-backend-rvws.vercel.app/api/v1/dashboard/create', {
        title: formData.title,
        category: formData.category,
        description: formData.description
    }, config), 
    {
      loading: 'Submitting...',
      success: (res) => {
        setFormData({ title: '', category: '', description: '' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        return "Ticket Raised Successfully!";
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
            <h2 className="text-3xl font-serif text-slate-800 mb-2">Raise a Ticket</h2>
            <p className="text-slate-600">Please provide detailed information about your concern or suggestion below.</p>
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
                placeholder="Brief summary of the issue"
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
                <option value="" disabled>Select the issue category...</option>
                <option value="hardware">Hardware Issues</option>
                <option value="software">Software Issues</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="book_allocation">Book acquisition</option>
                <option value="staff_negligence">Staff Negligence</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea 
                id="description" 
                name="description" 
                rows="8" 
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none transition-colors bg-stone-50 focus:bg-white resize-y"
                placeholder="Detailed description..."
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-medium text-lg py-3 px-4 rounded-md transition-all duration-200 shadow-sm focus:ring-4 focus:ring-slate-300 outline-none"
              >
                Submit Ticket
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create_Ticket;