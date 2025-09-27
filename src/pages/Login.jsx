import React, { useState } from 'react'
import axios from 'axios'
import collegeLogo from './college.png'
import "./auth.css"
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [replay, setReplay] = useState("");
  const [hide, setHide] = useState(true);

  const onChangePassword = () => setHide(!hide);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter the fields");
    try {
      const res = await axios.post(
        "https://tripbackend-u7jf.onrender.com/user/login",
        { email, password },
        { withCredentials: true }
      );
      setReplay(res.data.msg);
      if (res.data.msg === "Login successful") {
        window.location.href = "/"; // redirect to home after login
      }
    } catch (err) {
      console.log(err);
      setReplay("Login failed");
    }
  };

  return (
    <div className="login-container">
      <Link to="/"><p className="exit"><FaArrowLeft /></p></Link>
      <div className="login-text">
        <h1> Login</h1>
      </div>
      <div className='login-header'>
        <img src={collegeLogo} alt="college logo" />
        <h1>2025 Batch BCA Trip</h1>
      </div> 
      <div className="login-inputs">
        <div className="input-icons">
          <input type="email" placeholder='Email..' onChange={(e)=>setEmail(e.target.value)} required/>
          <span><MdOutlineEmail /></span>
        </div>
        <div className="input-icons">
          <input type={!hide ? "text" : "password"} placeholder='Password..' onChange={(e)=>setPassword(e.target.value)} required/>
          <span onClick={onChangePassword}>
            {hide ? <BiSolidHide /> : <FaRegEye />}
          </span>
        </div>
        <p> I don't have an account? <Link to="/register"><span style={{color:"blue"}}>Register</span></Link></p>
        <button onClick={handleLogin}>Login</button>
        <p style={{color:"green", fontSize:"20px"}}>{replay}</p>
      </div>
    </div>
  )
}

export default Login
