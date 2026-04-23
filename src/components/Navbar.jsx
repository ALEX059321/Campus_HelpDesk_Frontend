import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Statistics', href: '/Statistics' },
    { name: 'Knowledge Base', href: '/Knowledge' },
  ];

  if (user) {
    if (user.role === 'admin') {
      navLinks.push({ name: 'Admin Panel', href: '/admin-dashboard' });
    } else {
      navLinks.push({ name: 'My Tickets', href: '/MyTickets' });
    }
  }

  return (
    <nav className="w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4">
            <div className="h-11 w-11 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
              <span className="text-white font-black text-2xl">C</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tighter">Campus</h1>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">Helpdesk</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.href} 
                  className="relative group text-[15px] font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
            </div>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            {/* DYNAMIC BUTTONS SECTION (Desktop) */}
            <div className="flex items-center gap-6">
              {user ? (
                <>
                  <span className="text-slate-900 font-bold text-sm">
                    {user.role === 'admin' ? 'Welcome Admin' : `Hi, ${user.name || 'User'}`}
                  </span>
                  <button 
                    onClick={logout}
                    className="bg-red-600 text-white px-7 py-2.5 rounded-lg text-[15px] font-bold hover:bg-red-700 transition-all shadow-md active:scale-95"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/Sign_in" className="text-[15px] font-bold text-slate-600 hover:text-slate-900 transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register"
                    className="bg-slate-900 text-white px-7 py-2.5 rounded-lg text-[15px] font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 focus:outline-none">
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-slate-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-slate-100 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="block text-lg font-bold text-slate-900" onClick={() => setIsOpen(false)}>{link.name}</Link>
          ))}
          <hr className="border-slate-100" />
          
          {/* DYNAMIC BUTTONS SECTION (Mobile) */}
          <div className="flex flex-col gap-3">
            {user ? (
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/Sign_in" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 text-slate-900 font-bold border-2 border-slate-900 rounded-xl">Sign In</button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg">Create Account</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;