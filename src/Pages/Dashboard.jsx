
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar/SideBar'
import NavBar from '../components/Navbar/NavBar'




const Dashboard = () => {
  return (
  
      <div className="">
        <div className="flex dark:bg-dark-1 ">
          <div className="hidden md:block">
            <SideBar />
          </div>
          <div className="w-full flex flex-col  ">
            <NavBar />
            <Outlet />
          </div>
        </div>
      </div>
 
  )
}

export default Dashboard
