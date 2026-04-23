import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReportIncident = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    gender: '',
    incidentType: '',
    details: ''
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
      axios.post('https://campus-help-desk-backend-rvws.vercel.app/api/v1/dashboard/reports/create', formData, config), 
      {
        loading: 'Submitting Confidential Report...',
        success: (res) => {
          setFormData({ name: '', age: '', email: '', gender: '', incidentType: '', details: '' });
          setTimeout(() => navigate('/dashboard'), 2000);
          return "Report Submitted Successfully!";
        },
        error: (err) => {
          return err.response?.data?.message || "Submission failed";
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6 font-sans py-12">
      <Toaster position="top-right" />
      <div className="w-full max-w-3xl bg-white shadow-xl border-t-4 border-red-800 rounded-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-stone-50 px-8 py-6 border-b border-stone-200">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h2 className="text-3xl font-serif text-stone-900">Anti-Ragging Incident Report</h2>
          </div>
          <p className="text-stone-600 ml-11">This form is strictly confidential. Your safety and privacy are our highest priority.</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-colors bg-stone-50 focus:bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Age Field */}
              <div>
                <label htmlFor="age" className="block text-sm font-bold text-stone-700 mb-2">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  min="16"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-colors bg-stone-50 focus:bg-white"
                  placeholder="Enter your age"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-colors bg-stone-50 focus:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Gender Field */}
              <div>
                <label htmlFor="gender" className="block text-sm font-bold text-stone-700 mb-2">Gender</label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-colors bg-stone-50 focus:bg-white text-stone-700"
                  required
                >
                  <option value="" disabled>Select Gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Incident Type Field */}
            <div>
              <label htmlFor="incidentType" className="block text-sm font-bold text-stone-700 mb-2">Nature of Incident</label>
              <select 
                id="incidentType" 
                name="incidentType" 
                value={formData.incidentType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-colors bg-stone-50 focus:bg-white text-stone-700"
                required
              >
                <option value="" disabled>Select the type of incident...</option>
                <option value="Abuse">Verbal or Mental Abuse</option>
                <option value="Harassment">Harassment</option>
                <option value="Insult">Insult / Humiliation</option>
                <option value="Physical Violence">Physical Violence</option>
                <option value="Cyberbullying">Cyberbullying</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="details" className="block text-sm font-bold text-stone-700 mb-2">Incident Details</label>
              <div className="mb-2 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 font-medium">
                Please provide as much detail as possible, including time, location, and individuals involved.
              </div>
              <textarea 
                id="details" 
                name="details" 
                rows="6" 
                value={formData.details}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition-colors bg-stone-50 focus:bg-white resize-y"
                placeholder="Describe exactly what happened..."
                required
              ></textarea>
            </div>

            <div className="pt-6 border-t border-stone-200">
              <button 
                type="submit" 
                className="w-full bg-red-800 hover:bg-red-900 text-white font-bold text-lg py-4 px-4 rounded transition-all duration-200 shadow-md hover:shadow-lg focus:ring-4 focus:ring-red-200 outline-none flex justify-center items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Submit Confidential Report
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIncident;
