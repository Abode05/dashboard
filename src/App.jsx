import { Route, Routes } from "react-router-dom"
import Register from "./Auth/Register"

import Dashboard from "./Pages/Dashboard"
import Products from "./components/Products/Products"
import Favorate from "./components/Favorate/Favorate"
import OrderList from "./components/OrderList/OrderList"
import Login from "./Auth/Login"
import CreateProduct from "./components/CreateProduct/CreateProduct"
import EditProduct from "./components/EditProduct/EditProduct"
import { createContext, useState } from "react"

const Context = createContext()
function App() {
  const [SearchFilter, SetSearchFilter] = useState('')

  return (
    <div className="">
      <Context.Provider value={{ SearchFilter, SetSearchFilter }}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Products />} />

            <Route path="product" element={<Products />} />
            <Route path="edit/:id" element={<EditProduct />} />

            <Route path="createproduct" element={<CreateProduct />} />

            <Route path="favorate" element={<Favorate />} />
            <Route path="OrderList" element={<OrderList />} />
          </Route>
        </Routes>
      </Context.Provider>
    </div>
  )
}

export default App
export {Context}