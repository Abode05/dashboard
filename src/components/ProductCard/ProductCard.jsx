import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Context } from '../../App';
import ConfirmModal from '../../Confirm/ConfirmModal';

const ProductCard = () => {
  const { SearchFilter } = useContext(Context);
  const [Products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
/////get products
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://vica.website/api/items', {
      headers: {
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        setProducts(res.data);
        setFilter(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to fetch products');
      });
  }, []);
  /////
////filter on products
  useEffect(() => {
    setFilter(Products.filter(product => product.name.toLowerCase().includes(SearchFilter.toLowerCase())));
  }, [SearchFilter, Products]);
//////////
  
//////deleted products
  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const confirmDelete = (productId) => {
    const token = localStorage.getItem('token');
    axios.delete(`https://vica.website/api/items/${productId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        toast.success('Product deleted successfully');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to delete product');
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
///////
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-3 mt-6 w-full flex-col md:flex-row md:justify-center lg:justify-start">
        {filter.map((product) => (
          <div key={product.id} className="bg-white py-3 rounded px-5 dark:bg-dark-2">
            <img src={product.image_url} alt="" className="w-52 h-52 text-center m-auto" />
            <h1 className="text-2xl font-bold dark:text-gray-200">{product.name}</h1>
            <p className="text-blue-700 font-bold text-xl">{product.price}$</p>
            <div className="flex justify-between items-center mt-5">
              <Link to={`/dashboard/edit/${product.id}`} className="rounded-full bg-primary py-2 px-4 dark:bg-dark-3 dark:text-white hover:bg-dark-1 dark:hover:bg-dark-1 text-lg duration-200">
                Edit Product
              </Link>
              <button onClick={() => handleDeleteClick(product.id)}>
                <RiDeleteBin6Line className="w-6 h-6 dark:text-white" />
              </button>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        productId={selectedProductId}
      />
    </div>
  );
};

export default ProductCard;
