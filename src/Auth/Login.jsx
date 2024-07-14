import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const navigate = useNavigate()
  
  const handleLogin = async(event) => {
    event.preventDefault();
   await axios.post("https://vica.website/api/login", {
      email:email,
      password: password,      
    }
     
   ).then((res) => {
    
      console.log(res.data)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("User", JSON.stringify(res.data.user))
     toast.success("success login",{autoClose:1500})
     setTimeout(() => {
      navigate("/dashboard")
     }, 2000);
      
      

    
    }).catch((error) => {
      console.log(error)
       toast.error("password or email wrong")
    })    
  }
  return (
    <div className='relative   '>
      <img src="/assets/auth-bg.png" alt="" className='h-screen w-full absolute' />
      <div className= " max-w-3xl   bg-white px-12 py-4 absolute  translate-x-[-50%] left-[50%] top-6 md:top-9 rounded-2xl">
        <div className="text-center">
          <h1 className='font-bold text-2xl '>Login to Account</h1>
          <p className='text-lg font-semibold text-subtitle'>Please enter your email and password to continue</p>
        </div>
        <form method='post' action="" className='flex flex-col  gap-24  ' onSubmit={handleLogin}>
          <div className="mb-4 mt-10 flex flex-col gap-12">
          <label htmlFor="" className='flex flex-col  text-lg text-subtitle '>
            Email address:
              <input type="email" placeholder='example@gmail.com'
                className='border p-3 rounded-lg bg-secondary h-11 '
                name='email'
                required
                onChange={(e)=>setemail( e.target.value)}
              />
          </label>
           <label htmlFor="" className='flex flex-col w-full  text-lg text-subtitle '>
             Password: 
              <input type="password" placeholder='*******'
                className='border rounded-lg p-3 bg-secondary   h-11 '
                name='password'
                required
                onChange={(e)=>setpassword(e.target.value) }
              />
            </label>
          </div>
        <div className='flex items-center flex-col relative  gap-2  '>
          <button type='submit' className='  px-28 py-3 m-auto bg-blue-1  hover:bg-blue-600 duration-150
           rounded-lg text-white text-2xl font-semibold text-center opacity-90 '>Login</button> 
            <p className=' text-subtitle'>Already have an account?<Link to='/' className='underline text-blue-1 '>Create Account</Link></p>
            </div>
        </form>
        
      </div>
       <ToastContainer />
    </div>
  )
}

export default Login