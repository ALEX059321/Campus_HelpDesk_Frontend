import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Create_acc = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { name, email, password };

   
    toast.promise(
        axios.post('http://localhost:1200/api/v1/auth/register', data),
        {
            loading: 'Creating your account...', 
            success: (res) => {
               navigate('/Sign_in'); 
              return res.data.message || "Registration Successful!";
            },
            error: (err) => {
                return err.response?.data?.message || "Something went wrong";
            }
        },
        {
            
            style: {
                minWidth: '250px',
                fontSize: '18px',
            },
            success: {
                duration: 4000, 
            },
            error: {
                duration: 5000,
            }
        }
    );
};
 
  return (
    <div>
     
        <div> <Toaster 
  position="top-center" 
  toastOptions={{
    style: {
      fontSize: '20px',      
      padding: '16px 24px',  
      maxWidth: '500px',    
      width: '100%',      
      duration: 4000
    },
  }} 
/> </div>
      
  
      <div className="flex h-[700px] w-full">

        <div className="w-full hidden md:inline-block">
          <img 
            className="h-full w-[750px] ml-[300px]" 
            src="src/assets/image_8.png" 
            alt="leftSideImage" 
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">

        
          <form 
            onSubmit={handleSubmit}
            className="md:w-96 w-80 flex flex-col items-center justify-center"
          >

            <h2 className="text-4xl text-gray-900 font-medium">
              Create Account
            </h2>

            <p className="text-sm text-gray-500/90 mt-3">
              Welcome! Please register to continue
            </p>

            <button 
              type="button" 
              className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
            >
              <img 
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" 
                alt="googleLogo" 
              />
            </button>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90" />
              <p className="w-full text-nowrap text-sm text-gray-500/90">
                or register yourself
              </p>
              <div className="w-full h-px bg-gray-300/90" />
            </div>

            {/* NAME */}
            <div className="flex items-center w-full border h-12 rounded-full pl-6 gap-2 mb-6">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none text-sm"
                required
              />
            </div>

         {/* email */}
            <div className="flex items-center w-full border h-12 rounded-full pl-6 gap-2">
              <input
                type="email"
                placeholder="Email id"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-sm"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center mt-6 w-full border h-12 rounded-full pl-6 gap-2">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-sm"
                required
              />
            </div>

         
            <button 
              type="submit"
              className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90"
            >
              Register 
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Create_acc;