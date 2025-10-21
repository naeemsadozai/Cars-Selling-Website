
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({});
  const [backendOtp, setBackendOtp] = useState();
  const [otpSent,setOtpSent] = useState(false);
  const [loader,setLoader] = useState(false);

  let navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }


  const handleCreation = async (e)=>{
    e.preventDefault();
    let otp = data.otp
    if(backendOtp.toString() === otp){
      try {
        setLoader(true);
        window.scrollTo(0,0);
        await axios.post("https://cars-selling-website-backend.onrender.com/auth/register",data,{withCredentials:true})
        navigate('/')
      } catch (error) {
        if(error.response){
          alert(error.response.data.message)
          setLoader(false);
          navigate('/auth/register')
        }else{
          alert("Some Error Occured")
          setLoader(false);
          navigate('/auth/register')
        }
      }
    }else{
      alert("Invalid ! Please enter valid otp")
    }
  }

  const handleOtp = async (e)=>{
    e.preventDefault()
    let email = data.email;
    try {
      setLoader(true);
      window.scrollTo(0,0)
      let response = await axios.post("https://cars-selling-website-backend.onrender.com/auth/register/checkUser",{email},{withCredentials:true})
      if(response.status === 200){
        alert(response.data.message)
        setLoader(false)
        navigate('/auth/login');
      }else{
        setLoader(false)
        setBackendOtp(response.data.otp);
        setOtpSent(true);
      }
    } catch (error) {
      if(error.response){
        setLoader(false)
        alert(error.response.data.message)
        navigate('/auth/login')
      }else{
        alert(error)
        setLoader(false)
        navigate('/auth/login')
      }
    }
  }

  return (
    <main className='w-full min-h-screen border flex items-center justify-center bg-[url("/Images/login_bg.jpeg")] bg-cover p-4'>
      
      <div className='flex h-full sm:h-4/5 w-full max-w-5xl sm:w-4/5 shadow-2xl box-border mx-auto'>
        
        <div className='h-full w-full md:w-3/6 flex items-center justify-center bg-transparent text-white p-4 sm:p-8'>
          
          <div className='w-full max-w-sm sm:w-9/12 h-full flex flex-col items-center pt-8 mx-auto'>
            {(!otpSent && !loader) && <form className='w-full h-full flex flex-col items-center max-sm:mt-12 max-sm:gap-4' onSubmit={handleOtp}>
              <h1 className='text-white font-bold text-3xl text-shadow-xs text-shadow-blue-900'>Register Account</h1>
               <div className='w-full border h-12 flex relative rounded-md mt-10 mb-6'>
                <input id='name' className='pl-2 peer w-11/12 ml-1 outline-none text-md' type="text" name='name' placeholder=' ' onChange={handleChange} required />
                <label htmlFor="name" className='peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-5 absolute bg-black text-white peer-focus:textwhite peer-placeholder-shown:text-white  peer-focus:left-[8px] left-[8px] peer-focus:top-[-12px] top-[-12px] peer-focus:text-sm text-sm peer-placeholder-shown:text-[16px] transition-all duration-150 ease-in'>Enter Name</label>
              </div>
              
              <div className='w-full border h-12 flex relative rounded-md mb-6'>
                <input id='email' className='pl-2 peer w-11/12 ml-1 outline-none text-md' type="email" name='email' placeholder=' ' onChange={handleChange} required />
                <label htmlFor="email" className='peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-5 absolute bg-black text-white peer-focus:textwhite peer-placeholder-shown:text-white  peer-focus:left-[8px] left-[8px] peer-focus:top-[-12px] top-[-12px] peer-focus:text-sm text-sm peer-placeholder-shown:text-[16px] transition-all duration-150 ease-in'>Email ID</label>
              </div>
              
              <div className='w-full border h-12 flex relative items-center justify-between rounded-md mb-6'>
                <input id='pass' className='pl-2 peer w-10/12 ml-1 outline-none text-md' type={(showPass) ? 'text' : 'password'} name='password' placeholder=' ' onChange={handleChange} required />
                <span className='cursor-pointer ml-5 hover:text-blue-600 mr-3' onClick={() => setShowPass(!showPass)}><i className={(!showPass) ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i></span>
                <label htmlFor="pass" className='peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-5 absolute bg-black text-white peer-focus:textwhite peer-placeholder-shown:text-white  peer-focus:left-[8px] left-[8px] peer-focus:top-[-12px] top-[-12px] peer-focus:text-sm text-sm peer-placeholder-shown:text-[16px] transition-all duration-150 ease-in'>Password</label>
              </div>
                            
              <div className='w-full'>
                <button type='submit' className='cursor-pointer w-full border h-10 rounded-4xl text-lg font-bold font bg-blue-600 text-white'>Register</button>
              </div>
                            
            </form>}

             {(loader) && <div className='w-[100vw] h-[80vh]'>
               <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1>Please wait your request is being Processed</h1>
                <div className='w-20 h-20 border-t-1 mt-8 rounded-full rotate_transition'></div>
                </div> 
            </div>}
              

            {(otpSent && !loader) && <form className='w-full h-full flex flex-col items-center max-sm:mt-12 max-sm:gap-4' onSubmit={handleCreation}>
              <h1 className='text-white font-bold text-3xl text-shadow-xs text-shadow-blue-900'>Register Account</h1>
               
              <div className='w-full border h-12 flex relative rounded-md mb-6'>
                <input id='otp' className='pl-2 peer w-11/12 ml-1 outline-none text-md' type="text" name='otp' placeholder=' ' onChange={handleChange} required />
                <label htmlFor="email" className='peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-5 absolute bg-black text-white peer-focus:textwhite peer-placeholder-shown:text-white  peer-focus:left-[8px] left-[8px] peer-focus:top-[-12px] top-[-12px] peer-focus:text-sm text-sm peer-placeholder-shown:text-[16px] transition-all duration-150 ease-in'>Enter OTP</label>
              </div>
                            
              <div className='w-full'>
                <button type='submit' className='cursor-pointer w-full border h-10 rounded-4xl text-lg font-bold font bg-blue-600 text-white'>Sign Up</button>
              </div>
                            
            </form>}

            
            
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

export default Register;
