import React from 'react'
import './App.css'
import { Route , Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blogs from './pages/Blogs'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blogs' element={<Blogs/>} />
      </Routes>
    </>
  )
}
export default App
