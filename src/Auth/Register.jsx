import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Register = () => {  
  const [userData, setUserData] = useState({
    first_name:"",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image:null
    
  })

  const navigate = useNavigate();
 
   const fileInputRef = useRef(null);
   const handleImageClick = () => {
   
     fileInputRef.current.click();
     
  }
   
  const handlechange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setUserData({ ...userData, [name]: files[0] })
     
      
    } else {
      setUserData({...userData,[name]:value})
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.password_confirmation) {
       toast.warning("Passwords do not match");
      return
    }
    const formdata = new FormData()
    formdata.append("first_name",userData.first_name)
    formdata.append("last_name", userData.last_name)
    formdata.append("user_name",userData.user_name)
    formdata.append("password",userData.password)
    formdata.append("email",userData.email)
    formdata.append("password_confirmation",userData.password_confirmation)
    formdata.append("profile_image",userData.profile_image)
    console.log(formdata)

       



    const responsive= await axios.post("https://vica.website/api/register", formdata, {
      headers: { "Content-Type": "multipart/form-data", }
    }).then((res) => {
      console.log(res.data)
      console.log(res.data.data.token)
      localStorage.setItem("token", res.data.data.token)
      localStorage.setItem("User", JSON.stringify(res.data.data.user))
      toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
       navigate('/dashboard');
     

      
     
    }
    ).catch(error => {
      console.error(error)
        toast.error("error  register")
    });

  }
  

  return (
      <div className='relative   bg-white  flex justify-center items-center'>
          <img src="/assets/auth-bg.png" alt="" className='hidden md:block min-h-screen w-full object-cover absolute -z-1  ' />
          <div className=" max-w-3xl w-full  top-4   md:w-[760px]  bg-white relative rounded-2xl">
        <div className=" text-center p-4  ">
           <h1 className='text-4xl font-bold'>create an accout</h1>
              <p className='text-md text-subtitle'>create a acoouunt to continue</p>
        </div>     
       
              <form action="post" className='p-6 flex flex-col gap-5 relative  ' onSubmit={handlesubmit} >
          <div className="flex flex-col md:flex-row  gap-4 ">
            <label htmlFor="" className='flex flex-col text-lg text-subtitle w-full  '>
              First Name
              <input type="text" placeholder='First Name' required
                name='first_name'
                className=' p-3  border rounded-lg bg-secondary w-full h-11  '
                onChange={handlechange}
              />
            </label>
            <label htmlFor="" className='flex flex-col   text-lg text-subtitle w-full ' >
              Last Name
              <input type="text" placeholder='Last Name'
                required
                name='last_name'
                className='border rounded-lg p-3 bg-secondary w-full h-11 '
              onChange={handlechange}
              />
            </label>
            <label htmlFor="" className='flex flex-col  text-lg text-subtitle w-full '>
             User Name
              <input type="text" placeholder='User Name'
                required
                name='user_name'
                className='border rounded-lg p-3 bg-secondary w-full h-11 '
              onChange={handlechange}
              />
            </label>
          </div>
        
          <label htmlFor="" className='flex flex-col  text-lg text-subtitle w-full '>
            Email address:
            <input type="email" placeholder='example@gmail.com'
              required
              name='email'
              className='border p-3 rounded-lg bg-secondary h-11'
            onChange={handlechange}
            />
            </label>
          <div className="flex flex-col md:flex-row   gap-5  ">
            <label htmlFor="" className='flex flex-col w-full  text-lg text-subtitle '>
             Password: 
              <input type="password" placeholder='*******'
                required
                 name='password'
                className='border rounded-lg p-3 bg-secondary   h-11 '
              onChange={handlechange}
              />
            </label>
            <label htmlFor="" className='flex flex-col w-full text-subtitle  text-lg  '>
              confirm password:
              <input type="password" placeholder='********'
                required
              name='password_confirmation'  
               
                className='border rounded-lg p-3 bg-secondary h-11  '
              onChange={handlechange}
              />
            </label>
          </div>
         
          <label htmlFor="" className='cursor-pointer relative text-subtitle  text-lg flex flex-col items-center md:items-start' >
            Profile Image:
            <img src={userData.profile_image ? URL.createObjectURL(userData.profile_image) : ` assets/profile-avatar.png`} alt=""
              className='w-20 h-20 rounded-full mb-2 md:absolute top-8'
            onClick={handleImageClick}
            /> 
            <input type="file" src='assets/profile-avatar.png'
              className='hidden'
              name='profile_image'
              
             ref={fileInputRef}
              accept='image/*'
            onChange={handlechange}
            />
            
          </label>
          <div className='flex items-center flex-col mt-4 gap-1  '>
          <button className='  px-28 py-3 m-auto bg-blue-1  hover:bg-blue-600 duration-150 
           rounded-lg text-white text-2xl font-semibold text-center opacity-90 ' type='submit'>Sign Up</button> 
            <p className=' text-subtitle'>Already have an account?<Link to='login' className='underline text-blue-1 '>Login</Link></p>
            </div>
        </form>
  
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register