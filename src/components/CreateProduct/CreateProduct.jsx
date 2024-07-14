import axios from 'axios'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreateProduct = () => {
   const navigate=useNavigate()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [ProductImage, setProductImage] = useState(null)
  const token = localStorage.getItem("token")

  const create=useRef(null)
  const hancleCraeteProduct = () => {
      create.current.click();
  }
 
  const handleCreate = async(e) => {
    e.preventDefault();
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("price", price)
    formdata.append("image", ProductImage)
    // console.log(formdata)
    await axios.post("https://vica.website/api/items", formdata, {
      headers: {
        Accept: "application/json",
        'Authorization': `Bearer ${token}`
        
      }
    }).then((res) => {
      console.log(res.data)
      
     
      navigate('/dashboard')
        toast.success(`${res.data}`);
     
    }).catch((error) => {
      console.log(error)
    })
    
 }
  return (
   <div className='p-6 '>
      <h1 className='text-3xl font-semibold mb-4 dark:text-gray-200 text-dark-1 mt-16  '>Create Product</h1>
      <form action="" className='flex  justify-between gap-16 md:flex-row flex-col ' onSubmit={handleCreate} >
        <div className=" mb-4  ">
          <label htmlFor="" className='flex flex-col  text-xl text-subtitle  mb-4 dark:text-gray-200 gap-2 '>
            name product:
            <input type="text" placeholder='name product...'
              className=' border p-3 w-full rounded-lg bg-primary h-11 dark:text-black '
              required
            onChange={(e)=>setName(e.target.value)}
            />
          </label>
          <label htmlFor="" className='flex flex-col  text-xl text-subtitle  mb-4 dark:text-gray-200 gap-2'>
            price:
            <input type="text" placeholder='$ price '
              className='border p-3 w-full rounded-lg bg-primary h-11 font-semibold 
              dark:text-black  '
              name='price'
              required
              onChange={(e)=>setPrice(e.target.value)}
            />
          </label>
          <button className='bg-primary py-2 px-4 rounded-lg text-lg font-semibold ' type='submit'> create</button>
        </div>
        <div className="w-full md:w-[500px] h-64 border-dashed border-2 rounded border-blue-1 flex justify-center items-center flex-col cursor-pointer"> 
          <img src={ProductImage ? URL.createObjectURL(ProductImage) : "/assets/icons/upload.svg"} alt=""
            onClick={hancleCraeteProduct}
          className='w-52 h-52 object-contain rounded m-auto '
          />
          <p>Upload Product Image</p>
          <input type="file" className='hidden '
            ref={create}
            name='image'
            required
            onChange={(e)=>setProductImage(e.target.files[0])}
          />
        </div>
        
      </form>
    </div>
  )
}

export default CreateProduct