
import ProductCard from '../ProductCard/ProductCard'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div className='p-4'>

       <div className=" flex justify-between items-center md:flex-row flex-col gap-4 mt-20 relative ">
            <h1 className='text-3xl font-semibold uppercase dark:text-gray-200 pl-4'>all product</h1>
        <Link to="/dashboard/createproduct"
          className='bg-blue-700 px-6 py-2 rounded  flex text-white text-xl relative 
          hover:bg-blue-900 duration-150   font-semibold 
          ' > 
                <img src='/assets/icons/plus.svg'  className='text-center object-contain w-7  h-7 mt-1 '/>
                create product
                </Link>
      </div>
      
      <ProductCard />
      
    </div>
  )
}

export default Products