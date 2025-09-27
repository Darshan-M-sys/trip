import React, { useState } from 'react'
import axios from 'axios'
import collegeLogo from './college.png'
import "./auth.css"
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
const Register = () => {
  const[hide,setHide]=useState(true)
  const [username,setUsername]=useState("")
  const[email,setEmail]=useState("email")
  const[password,setPassword]=useState("")
  const [replay,setReplay]=useState("")
   const onChangePassword=()=>{
      if(!hide){
        setHide(true)
      }
      else{
        setHide(false)
      }
    }
  const handleRegister=()=>{

    if(username==="" || email==="" || password===""){
      return alert("please Enter all fields")
    }
   
    axios.post("http://localhost:5000/user/register",{username,email,password},{withCredentials:true})
    .then((res)=>setReplay(res.data.msg)).catch(()=>{
      console.log("error")
    })
  }
  return (
    
    <div className="login-container">
    <Link to="/">  <p className="exit"><FaArrowLeft /></p> </Link>
      <div className="login-text">
        <h1> Register</h1>
      </div>
      <div className='login-header'>
        <img src={collegeLogo} alt="college logos" />
        <h1>2025 Batch BCA Trip</h1>
      </div>
      <div className="login-inputs">
          <div className="input-icons">
           <input type="text" placeholder='Username..' onChange={(e)=>setUsername(e.target.value)}  required/>
       

         
<span><FaUserAlt /></span>
  </div>
    <div className="input-icons">
           <input type="email" placeholder='Email..' onChange={(e)=>setEmail(e.target.value)}  required/>
         
        <span><MdOutlineEmail /> </span>
        </div >
          <div className="input-icons" >
           <input type={!hide?"text":"password"} placeholder='Password..' onChange={(e)=>setPassword(e.target.value)}  required/>
      <span onClick={onChangePassword}> 
        {hide?<BiSolidHide />:<FaRegEye />}


</span></div>
        <p> I already have an account? 
          <Link to='/login'> <span style={{color:"blue"}}>login</span> </Link></p>
<button onClick={handleRegister}>Register</button>
<p style={{color:"green",fontSize:"20px"}}>{replay}</p>
      </div>
    </div>
  )
}

export default Register
