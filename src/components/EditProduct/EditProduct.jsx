import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image_url: null,
  })
  const [imageFile, setImageFile] = useState(null) // حالة لتخزين الملف
  const token = localStorage.getItem('token')
  const create = useRef(null)

  const handleCreateProduct = () => {
    create.current.click()
  }

  useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setProduct({
          name: res.data.name,
          price: res.data.price,
          image_url: res.data.image_url,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id, token])

  const handlePut = (e) => {
    e.preventDefault()
    const ids = toast.loading('Please wait...')

    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)
    if (imageFile) {
      formData.append('image', imageFile) // استخدام الملف الفعلي بدلاً من الـ URL
    }
    formData.append('_method', 'PUT')

    axios
      .post(`https://vica.website/api/items/${id}`, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        toast.update(ids, {
          render: 'Product updated successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2500,
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      })
      .catch((error) => {
        console.log(error.response.data)
        toast.error('There was an error updating the product')
      })
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4 dark:text-gray-200 text-dark-1  mt-16  ">
        Edit Product
      </h1>
      <form
        method=""
        action=""
        className="flex  justify-between gap-16 md:flex-row flex-col"
        onSubmit={handlePut}
      >
        <div className=" mb-4  ">
          <label
            htmlFor="name"
            className="flex flex-col  text-xl text-subtitle  mb-4 dark:text-gray-200 gap-2"
          >
            Name Product:
            <input
              type="text"
              placeholder=""
              className="border p-3 w-full rounded-lg bg-primary h-11 text-subtitle"
              name="name"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              value={product.name}
            />
          </label>
          <label
            htmlFor="price"
            className="flex flex-col  text-xl text-subtitle  mb-4 dark:text-gray-200 gap-2"
          >
            Price:
            <input
              type="text"
              placeholder="$"
              className="border p-3 w-full rounded-lg bg-primary h-11 text-subtitle"
              name="price"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              value={product.price}
            />
          </label>
          <button
            className="bg-primary py-2 px-4 rounded-lg text-lg font-semibold"
            type="submit"
          >
            Update
          </button>
        </div>
        <div
          className="w-full md:w-[500px] h-64 border-dashed border-2 rounded border-blue-1 flex justify-center 
        items-center flex-col cursor-pointer"
        >
          <img
            src={product.image_url}
            alt=""
            onClick={handleCreateProduct}
            className="w-52 h-52 object-contain rounded m-auto"
          />
          <p className="dark:text-gray-200 font-semibold">
            Upload Product Image
          </p>
          <input
            type="file"
            className="hidden"
            ref={create}
            name="image_url"
            onChange={(e) => {
              setProduct({
                ...product,
                image_url: URL.createObjectURL(e.target.files[0]), // عرض الصورة الجديدة
              })
              setImageFile(e.target.files[0]) // حفظ الملف في state لإرساله إلى الخادم
            }}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditProduct
