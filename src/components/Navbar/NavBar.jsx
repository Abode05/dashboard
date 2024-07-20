import { useContext, useEffect, useState } from 'react'
import { FiAlignJustify } from 'react-icons/fi'
import { Context } from '../../App'
import { NavLink } from 'react-router-dom'
import { sidebarData } from '../../assets/constant/data'
import { FaMoon } from "react-icons/fa";

const NavBar = () => {
  const [result, setResult] = useState('')
  const { SetSearchFilter } = useContext(Context)
  const user = JSON.parse(localStorage.getItem('User'))

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const elemant = document.documentElement

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      elemant.classList.add('dark')
      elemant.classList.remove('light')
    } else {
      elemant.classList.add('light')
      elemant.classList.remove('dark')
    }
  }, [theme, elemant])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleSearch = (e) => {
    setResult(e.target.value)
    SetSearchFilter(e.target.value.toLowerCase())
  }

  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMenuClick = () => {
    setIsOpen(false)
  }

  return (
    <div
      className={`p-4 w-full flex justify-between fixed items-center z-30
     bg-white shadow-md dark:bg-dark-2 dark:text-gray-200 
     ${
       isScrolled ? 'bg-white/80 backdrop-blur-md' : ''
     }`}
    >
      <div className="relative hidden md:block">
        <img
          src="/assets/icons/search.svg"
          alt=""
          className="absolute top-2 left-2"
        />
        <input
          type="text"
          placeholder="Search a product ..."
          className="bg-secondary rounded-full w-56 h-8 pl-8 text-black"
          name=""
          onChange={handleSearch}
        />
      </div>

      <div className="flex gap-3 items-center justify-center relative md:right-64 ">
        <img
          src={user.profile_image_url}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="font-bold uppercase">{user.first_name}</h1>
          <p className="text-sub -mt-2">{user.user_name}</p>
        </div>
        <div className="m-auto">|</div>
        <div className="cursor-pointer text-xl  " onClick={toggleTheme}>
         <FaMoon   className=''/>
        </div>
      </div>

      <div
        className="block md:hidden text-2xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiAlignJustify />
      </div>

      {isOpen && (
        <div className="absolute z-10 h-screen top-full left-0 right-0 bg-white dark:bg-dark-2 shadow-md p-4">
        
          <div className="relative">
            <img
              src="/assets/icons/search.svg"
              alt=""
              className="absolute top-2 left-2"
            />
            <input
              type="text"
              placeholder="Search a product ..."
              className="bg-secondary rounded-full w-full h-8 pl-8"
              name=""
              onChange={handleSearch}
            />
            <div className="flex flex-col justify-between">
              <ul className="flex flex-col gap-4 relative justify-center mt-3">
                {sidebarData.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col justify-center text-lg"
                    onClick={handleMenuClick}
                  >
                    <NavLink to={item.link}>
                      {({ isActive }) => (
                        <div className="flex relative justify-start">
                          <div
                            className={
                              isActive
                                ? 'border-r-4 border-blue-1 relative right-5 h-16 rounded-r-2xl duration-200'
                                : ''
                            }
                          ></div>
                          <div className="flex gap-4 justify-start items-center w-full">
                            <i
                              className={`${item.icon} dark:text-white w-6 h-6 p-1`}
                            ></i>
                            <p className="text-xl relative -top-1">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
