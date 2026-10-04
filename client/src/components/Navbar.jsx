import React from 'react'
import { Link , NavLink } from 'react-router-dom'
import {FiLayout} from "react-icons/fi"
import {useAuth} from "../context/AuthContext"
import logo from "../assets/logo.png"
import { IoLogOutOutline } from "react-icons/io5";




const Navbar = () => {

  const {user,isAuthenticated,logOut}=useAuth()

  return (
    <header className='sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop:backdrop-blur-2xl '>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8 '>
        <Link to='/' className='flex items-center gap-2'>
          <img src={logo} alt="logo" className='flex items-center gap-2 w-15 h-15 rounded object-cover' />
          <div>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900'>Blog <span className='text-blue-600'>Sphere</span></h1>
            <p className='hidden text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:block'>Stories That's Matter</p>
          </div>
        </Link>
        <nav className='hidden items-center gap-8 md:flex '>
          <NavLink 
            to='/'
            className={({isActive})=>
            `text-md font-medium transition ${isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900 hover:scale-105"}`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to='/blogs'
            className={({isActive})=>
            `text-md font-medium transition ${isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900 hover:scale-105"}`
            }
          >
            Blogs
          </NavLink>
          {
            isAuthenticated && (
              <NavLink 
            to='/dashboard'
            className={({isActive})=>
            `text-md font-medium transition ${isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900 hover:scale-105"}`
            }
          >
            <FiLayout/>
            Dashboard 
          </NavLink>
            )
          }
        </nav>
        <div className='hidden md:flex gap-5 '>
          <button className='flex items-center gap-2 p-2 border rounded font-medium shadow cursor-pointer '>LogIn <IoLogOutOutline className='text-2xl font-medium' />   </button>
          <button className='p-2 border rounded bg-black text-white font-medium shadow cursor-pointer '>Get Started</button>
        </div>
      </div>

    </header>
  )
}

export default Navbar