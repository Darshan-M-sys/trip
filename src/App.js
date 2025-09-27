import React from 'react'
import Home from './pages/Home'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Images from './pages/Images'
import UploadPhoto from './pages/UploadPhoto'
import Visitors from './pages/Visitor'
const App = () => {
  return (
    <div>
   
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/images" element={<Images/>}/>
        <Route path="/uploadImages" element={<UploadPhoto/>}/>
        <Route path="/visitor" element={<Visitors/>}/>
      </Routes>
    </div>
  )
}

export default App
