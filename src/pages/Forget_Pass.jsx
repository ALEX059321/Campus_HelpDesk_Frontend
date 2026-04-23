import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Forget_Pass = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:1200/api/v1/auth/forgot-password', { email });
      if (res.data.success) {
        toast.success(res.data.message || "OTP sent successfully!");
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter the OTP");

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:1200/api/v1/auth/verify-otp', { email, otp });
      if (res.data.success) {
        toast.success("OTP verified!");
        setStep(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return toast.error("Please fill both password fields");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:1200/api/v1/auth/reset-password', { email, otp, newPassword });
      if (res.data.success) {
        toast.success("Password reset successfully! Redirecting...");
        setTimeout(() => navigate('/Sign_in'), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <style dangerouslySetInnerHTML={{__html: "\n      body {\n        font-family: 'Inter', sans-serif;\n      }\n    " }} />
      {/* Forgot Password Form Section */}
      <section className="w-full max-w-md m-auto mt-40">
        <div className="rounded-none bg-white p-8 shadow-sm"> 
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center items-center">
              <svg className="h-12 w-12 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-black">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Enter OTP"}
              {step === 3 && "Reset Password"}
            </h1>
            <p className="text-sm text-gray-600">
              {step === 1 && "Enter your email address and we'll send you an OTP to reset your password."}
              {step === 2 && `We've sent a 6-digit code to ${email}. Please check your inbox and spam folder.`}
              {step === 3 && "Please enter your new password."}
            </p>
          </div>
          
          {/* Step 1: Email Form */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" 
                  placeholder="your.email@example.com" 
                  required 
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400">
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step 2: OTP Form */}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <label htmlFor="otp" className="mb-2 block text-sm font-medium text-gray-700">6-Digit OTP</label>
                <input 
                  type="text" 
                  id="otp" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none tracking-widest text-center text-lg" 
                  placeholder="------" 
                  maxLength={6}
                  required 
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* Step 3: New Password Form */}
          {step === 3 && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" 
                  placeholder="••••••••" 
                  required 
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none" 
                  placeholder="••••••••" 
                  required 
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          {/* Additional Links */}
          <div className="mt-6 text-center">
           <Link to="/Sign_in" className="text-gray-600 hover:text-black"> ← Back to Signin </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Forget_Pass
