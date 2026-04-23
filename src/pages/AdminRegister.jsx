import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, email, password };

    toast.promise(
      axios.post('http://localhost:1200/api/v1/auth/admin/register', data),
      {
        loading: 'Registering new administrator...',
        success: (res) => {
          const adminData = { 
            token: res.data.token,
            role: 'admin',
            email: email,
            name: name
          };
          
          // Optionally auto-login or just redirect to dashboard
          login(adminData); 
          navigate('/admin-dashboard'); 
          return "Administrator successfully registered!";
        },
        error: (err) => {
          return err.response?.data?.message || "Admin registration failed";
        }
      },
      {
        style: {
          minWidth: '250px',
          fontSize: '18px',
          backgroundColor: '#1f2937',
          color: '#fff',
        },
        success: { duration: 4000 },
        error: { duration: 5000 }
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      
      <div className="flex h-[700px] w-full">
        <div className="w-full hidden md:inline-block bg-slate-900 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-slate-900 to-indigo-900 opacity-90 mix-blend-multiply"></div>
          <img className="h-full w-full object-cover opacity-50 grayscale" src="/assets/Sign_in.png" alt="Admin Portal Background" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
            <h1 className="text-5xl font-black tracking-wider mb-4">ADMIN ENROLLMENT</h1>
            <p className="text-xl font-medium text-slate-300">Expand the Administration Team</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center bg-white shadow-2xl relative">
          
          <div className="absolute top-8 left-8">
            <Link to="/admin-dashboard" className="flex items-center text-slate-500 hover:text-slate-900 font-semibold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center mt-8">
            <div className="bg-slate-900 text-white p-4 rounded-xl mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5c-1.1 0-2 .9-2 2v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            
            <h2 className="text-4xl text-slate-900 font-black tracking-tight">New Admin</h2>
            <p className="text-sm font-semibold text-indigo-600 mt-2 uppercase tracking-widest">System Registration</p>
            
            <div className="flex items-center w-full bg-slate-50 border-2 border-slate-300 h-14 rounded-xl overflow-hidden pl-6 gap-3 mt-8 transition-colors focus-within:border-slate-900 focus-within:bg-white">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input 
                type="text" 
                placeholder="Full Name"  
                onChange={(e) => setName(e.target.value)} 
                className="bg-transparent text-slate-900 font-medium outline-none text-base w-full h-full placeholder-slate-400" 
                required 
              />                 
            </div>

            <div className="flex items-center w-full bg-slate-50 border-2 border-slate-300 h-14 rounded-xl overflow-hidden pl-6 gap-3 mt-5 transition-colors focus-within:border-slate-900 focus-within:bg-white">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input 
                type="email" 
                placeholder="Official Email"  
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-transparent text-slate-900 font-medium outline-none text-base w-full h-full placeholder-slate-400" 
                required 
              />                 
            </div>

            <div className="flex items-center mt-5 w-full bg-slate-50 border-2 border-slate-300 h-14 rounded-xl overflow-hidden pl-6 gap-3 transition-colors focus-within:border-slate-900 focus-within:bg-white">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input 
                type="password" 
                placeholder="Secure Password"  
                onChange={(e) => setPassword(e.target.value)} 
                className="bg-transparent text-slate-900 font-medium outline-none text-base w-full h-full placeholder-slate-400" 
                required 
              />
            </div>

            <button type="submit" className="mt-8 w-full h-14 rounded-xl font-bold text-lg tracking-wide text-white bg-slate-900 hover:bg-black shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              AUTHORIZE & CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
