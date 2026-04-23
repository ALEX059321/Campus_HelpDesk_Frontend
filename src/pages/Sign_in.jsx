import React, { useState, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext'; 
import { Navigate } from 'react-router-dom';
const Sign_in = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { email, password };

    try {
      const loginPromise = axios.post('http://localhost:1200/api/v1/auth/login', data);
      
      await toast.promise(
        loginPromise,
        {
          loading: 'Fetching your account details...',
          success: (res) => {
            const userData = { 
              ...res.data.user, 
              token: res.data.token 
            };
            
            login(userData); 
            setTimeout(() => navigate('/'), 1000); 
            return "Successfully logged in!";
          },
          error: (err) => {
            return err.response?.data?.message || "Invalid email or password";
          }
        },
        {
          style: {
            minWidth: '250px',
            fontSize: '18px',
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          }
        }
      );
    } catch (error) {
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            fontSize: '20px',      
            padding: '16px 24px',  
            maxWidth: '500px',    
            width: '100%',      
          },
        }} 
      />
      
      <div className="flex h-[700px] w-full">
        <div className="w-full hidden md:inline-block">
        
          <img className="h-full w-[650px] ml-[350px]" src="/src/assets/Sign_in.png" alt="leftSideImage" />
        </div>

        <div className="w-full flex flex-col items-center justify-center relative">
          
          {/*Toggle */}
          <div className="absolute top-8 right-8 flex items-center bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200">
            <div className="px-6 py-2 rounded-full text-sm font-bold bg-white text-indigo-600 shadow-sm transition-all cursor-default">
              Student
            </div>
            <Link to="/admin-login" className="px-6 py-2 rounded-full text-sm font-semibold text-gray-500 hover:text-gray-900 transition-all">
              Admin
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
            <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>
            
            <button type="button" className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
            </button>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90" />
              <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
              <div className="w-full h-px bg-gray-300/90" />
            </div>

            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width={16} height={11} viewBox="0 0 16 11" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
              </svg>
              <input 
                type="email" 
                placeholder="Email id"  
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full" 
                required 
              />                 
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width={13} height={17} viewBox="0 0 13 17" fill="none">
                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
              </svg>
              <input 
                type="password" 
                placeholder="Password"  
                onChange={(e) => setPassword(e.target.value)} 
                className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full" 
                required 
              />
            </div>

            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
             
              <Link to="/forget-password" name='password' className="text-sm underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:bg-indigo-300 flex justify-center items-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : "Login"}
            </button>

            <p className="text-gray-500/90 text-sm mt-4">
              Don’t have an account? 
              <Link to="/register" className="text-indigo-400 hover:underline ml-1">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_in;