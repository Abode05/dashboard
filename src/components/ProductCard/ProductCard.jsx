import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { Context } from '../../App'

const ProductCard = () => {
    const { SearchFilter } = useContext(Context)
    const [Products, setProducts] = useState([])
    const[filter,setFilter]=useState([])
    useEffect(() => {
            const token=localStorage.getItem("token")
            axios.get("https://vica.website/api/items", {
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
             }
            
            }).then((res) => {
 
            console.log(res.data)
            setProducts(res.data)
            setFilter(res.data)
            
           
        }).catch((error) => {
            console.log(error)
            toast.error("Failed to fetch products");

       })
    }, [])
    useEffect(() => {
        setFilter(Products.filter(product => product.name.toLowerCase().includes(SearchFilter.toLowerCase())))
    },[SearchFilter,Products])
     const navigate=useNavigate()
     const handledelete = (productId) => {
         const token = localStorage.getItem("token")
           toast.info("Deleting product, please wait...") 
        axios.delete(`https://vica.website/api/items/${productId}`, {
            headers: {
                 Accept: "application/json",
                 'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
            
            
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productId))
            navigate("/dashboard")
            
        }).catch((error) => {
            console.log(error)
        })
        
        
    }

    console.log(filter)
    return (
      <div className="p-4 ">
        <div className="flex flex-wrap gap-3 mt-6 w-full flex-col  md:flex-row md:justify-center lg:justify-start">
          {filter.map((product) => (
            <div
              key={product.id}
              className="bg-white py-3 rounded px-5 dark:bg-dark-2   "
            >
              <img
                src={product.image_url}
                alt=""
                className="w-52 h-52 text-center m-auto"
              />
              <h1 className="text-2xl font-bold dark:text-gray-200  ">
                {product.name}{' '}
              </h1>
              <p className="text-blue-700 font-bold text-xl ">
                {product.price}$
              </p>
              <div className="flex justify-between items-center mt-5 ">
                <Link
                  to={`/dashboard/edit/${product.id}`}
                  className="rounded-full bg-primary py-2 px-4
                     dark:bg-dark-3 dark:text-white hover:bg-dark-1 dark:hover:bg-dark-1 text-lg duration-200"
                >
                  Edit Product
                </Link>
                <button onClick={() => handledelete(product.id)}>
                  <RiDeleteBin6Line className='w-6 h-6 dark:text-white ' />
                </button>
              </div>
            </div>
          ))}
          <ToastContainer />
        </div>
      </div>
    )
}

export default ProductCard