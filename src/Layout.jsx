import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Home from './pages/Hero'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
