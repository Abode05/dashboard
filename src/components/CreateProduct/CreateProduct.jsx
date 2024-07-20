import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const token = localStorage.getItem("token");

  const fileInputRef = useRef(null);

  const handleCreateProductClick = () => {
    fileInputRef.current.click();
  };

  const handleCreate = async (e) => {
const ids = toast.loading("Please wait...")
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", productImage);

    
     await axios.post("https://vica.website/api/items", formData, {
        headers: {
          Accept: "application/json",
          'Authorization': `Bearer ${token}`,
        },
     }).then((response => {
        console.log(response.data);
      
      toast.update(ids, { render: "created new product", type: "success", isLoading: false  ,autoClose:2500});  
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000)
      })) 
       .catch((error) => {
        console.error(error);
      toast.error("Error in creating new product");
     })
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-semibold mb-4 dark:text-gray-200 text-dark-1 mt-16'>
        Create Product
      </h1>
      <form className='flex justify-between gap-16 md:flex-row flex-col' onSubmit={handleCreate}>
        <div className="mb-4">
          <label className='flex flex-col text-xl text-subtitle mb-4 dark:text-gray-200 gap-2'>
            Name Product:
            <input
              type="text"
              placeholder='Name product...'
              className='border p-3 w-full rounded-lg bg-primary h-11 dark:text-black'
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className='flex flex-col text-xl text-subtitle mb-4 dark:text-gray-200 gap-2'>
            Price:
            <input
              type="text"
              placeholder='$ Price'
              className='border p-3 w-full rounded-lg bg-primary h-11 font-semibold dark:text-black'
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="submit" className='bg-primary py-2 px-4 rounded-lg text-lg font-semibold'>
            Create
          </button>
        </div>
        <div className="w-full md:w-[500px] h-64 border-dashed border-2 rounded border-blue-1 flex justify-center items-center flex-col cursor-pointer">
          <img
            src={productImage ? URL.createObjectURL(productImage) : "/assets/icons/upload.svg"}
            alt="Upload Preview"
            onClick={handleCreateProductClick}
            className='w-52 h-52 object-contain rounded m-auto'
          />
          <p>Upload Product Image</p>
          <input
            type="file"
            className='hidden'
            ref={fileInputRef}
            required
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default CreateProduct;
