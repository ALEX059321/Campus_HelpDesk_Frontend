import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    toast.promise(
      axios.post('http://localhost:1200/api/v1/auth/admin/login', data),
      {
        loading: 'Authenticating administrator credentials...',
        success: (res) => {
          const adminData = { 
            token: res.data.token,
            role: 'admin',
            email: email
          };
          
          login(adminData); 
          navigate('/admin-dashboard'); 
          return "Administrator successfully logged in!";
        },
        error: (err) => {
          return err.response?.data?.message || "Admin login failed";
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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-90 mix-blend-multiply"></div>
          <img className="h-full w-[650px] ml-[350px] object-cover opacity-60" src="./public/assets/Sign_in.png" alt="Admin Portal" />
          <div className="absolute top-1/2 left-[500px] transform -translate-y-1/2 text-white">
            <h1 className="text-5xl font-black tracking-wider mb-4">ADMIN PORTAL</h1>
            <p className="text-xl font-medium text-slate-300">Authorized Personnel Only</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center bg-white shadow-2xl relative">
          
          {/* Slide Button Toggle */}
          <div className="absolute top-8 right-8 flex items-center bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200">
            <Link to="/Sign_in" className="px-6 py-2 rounded-full text-sm font-semibold text-gray-500 hover:text-gray-900 transition-all">
              Student
            </Link>
            <div className="px-6 py-2 rounded-full text-sm font-bold bg-slate-900 text-white shadow-md transition-all cursor-default">
              Admin
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center mt-12">
            <div className="bg-slate-900 text-white p-4 rounded-xl mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            
            <h2 className="text-4xl text-slate-900 font-black tracking-tight">Admin Login</h2>
            <p className="text-sm font-semibold text-red-600 mt-3 uppercase tracking-widest">Restricted Access</p>
            
            <div className="flex items-center w-full bg-slate-50 border-2 border-slate-300 h-14 rounded-xl overflow-hidden pl-6 gap-3 mt-10 transition-colors focus-within:border-slate-900 focus-within:bg-white">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input 
                type="email" 
                placeholder="Administrator Email"  
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-transparent text-slate-900 font-medium outline-none text-base w-full h-full placeholder-slate-400" 
                required 
              />                 
            </div>

            <div className="flex items-center mt-6 w-full bg-slate-50 border-2 border-slate-300 h-14 rounded-xl overflow-hidden pl-6 gap-3 transition-colors focus-within:border-slate-900 focus-within:bg-white">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input 
                type="password" 
                placeholder="Secure Password"  
                onChange={(e) => setPassword(e.target.value)} 
                className="bg-transparent text-slate-900 font-medium outline-none text-base w-full h-full placeholder-slate-400" 
                required 
              />
            </div>

            <button type="submit" className="mt-10 w-full h-14 rounded-xl font-bold text-lg tracking-wide text-white bg-slate-900 hover:bg-black shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              AUTHENTICATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
