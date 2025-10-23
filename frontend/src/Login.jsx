
import React, { useState } from 'react';
import {Link, redirect, useNavigate} from 'react-router-dom'
import axios from 'axios'

const App = () => {
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [data, setData] = useState({});

  let navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await axios.post('https://cars-selling-website-backend.onrender.com/auth/login',data,{withCredentials:true})
      navigate('/')
    } catch (error) {
      if(error.response){
        alert(error.response.data.message)
      }else{
        alert("Internal server error")
      }
    }
  }

  return (
    <main className='w-full min-h-screen border flex items-center justify-center bg-[url("/Images/login_bg.jpeg")] bg-cover p-4'>
      
      <div className='flex h-full sm:h-4/5 w-full max-w-5xl sm:w-4/5 shadow-2xl box-border mx-auto'>
        
        <div className='h-full w-full md:w-3/6 flex items-center justify-center bg-transparent text-white p-4 sm:p-8'>
          
          <div className='w-full max-w-sm sm:w-9/12 h-full flex flex-col items-center pt-8 mx-auto'>
            
            <form onSubmit={handleSubmit} className='w-full h-full flex flex-col items-center max-sm:mt-12 max-sm:gap-4'>
              <h1 className='text-blue-600 font-bold text-2xl'>Login Account</h1>

              <div className='w-full border h-12 flex relative rounded-md mt-10 mb-6'>
                <input id='email' className='pl-2 peer w-11/12 ml-1 outline-none text-md' type="email" name='email' placeholder=' ' onChange={handleChange} required />
                <label htmlFor="email" className='peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-5 absolute bg-black text-white peer-focus:textwhite peer-placeholder-shown:text-white  peer-focus:left-[8px] left-[8px] peer-focus:top-[-12px] top-[-12px] peer-focus:text-sm text-sm peer-placeholder-shown:text-[16px] transition-all duration-150 ease-in'>Email ID</label>
              </div>
              
              <div className='w-full border h-12 flex relative items-center justify-between rounded-md mb-6'>
                <input id='pass' className='pl-2 peer w-10/12 ml-1 outline-none text-md' type={(showPass) ? 'text' : 'password'} name='password' placeholder=' ' onChange={handleChange} required />
                <span className='cursor-pointer ml-5 hover:text-blue-600 mr-3' onClick={() => setShowPass(!showPass)}><i className={(!showPass) ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i></span>
                <label htmlFor="pass" className='peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-5 absolute bg-black text-white peer-focus:textwhite peer-placeholder-shown:text-white  peer-focus:left-[8px] left-[8px] peer-focus:top-[-12px] top-[-12px] peer-focus:text-sm text-sm peer-placeholder-shown:text-[16px] transition-all duration-150 ease-in'>Password</label>
              </div>
              
              <div className='flex justify-between w-full items-center mb-6'>
                <div className='flex items-center gap-1 text-sm'>
                  <input className='cursor-pointer' type="checkbox" name="remember_me" id="remember_me" onChange={() => setRemember(!remember)} />
                  <label htmlFor="remember_me" className='cursor-pointer text-xs'>Remember me</label>
                </div>
                <Link to={'/auth/register'} className='mr-3 text-xs md:text-sm text-blue-600 hover:underline'>Register an account</Link>
              </div>
              
              <div className='w-full'>
                <button type='submit' className='cursor-pointer w-full border h-10 rounded-4xl text-lg font-bold font bg-blue-600 text-white'>Login</button>
              </div>
              <h1 className='font-bold my-3'>OR</h1>
              
              <div className='w-full flex'>
                <Link to='http://localhost:8080/auth/google' className='cursor-pointer flex items-center justify-center w-full border h-10 rounded-4xl text-lg font-bold font bg-blue-600 text-white'><i className="fa-brands fa-google"></i> Login with Google</Link>
              </div> 
            </form>
            
          </div>
        </div>
        
        <div className='hidden md:block md:w-3/6 h-full'>
          {/* This empty div ensures the primary login box takes up only w-3/6 on medium screens, 
              allowing the background image to show on the remaining w-3/6 of the container. */}
        </div>

      </div>
    </main>
  )
}

export default App;

