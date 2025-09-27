import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import collegeLogo from "./college.png"
import {Link} from "react-router-dom"
import { IoSearch } from "react-icons/io5";
import "./Images.css"
const Images = () => {
  const [data, setData] = useState([]);
  const [search,setSearch]=useState("")

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    axios
      .get("https://tripbackend-u7jf.onrender.com/upload-multiple", { withCredentials: true })
      .then((res) => {
      setData(res.data.data)
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  return (
    <div className="image-container">
          <div className='login-header'>
             <Link to="/">  <p className="exit"><FaArrowLeft /></p> </Link>
              <img src={collegeLogo} alt="college logos" />
              <h1>2025 Batch BCA Trip Memories Images</h1>
            </div> 
            <div className="image-search-bar">
              <input   value={search}  type="text"  onChange={(e)=>setSearch(e.target.value)} placeholder="Search image  place..."/>
              <span>
    <IoSearch />
              </span>
            </div>
      <div className="images">
    {data.filter((item) => {
      const lowerSearch = search.toLowerCase();
      return (
        item.username.toLowerCase().includes(lowerSearch) ||
        item.place.toLowerCase().includes(lowerSearch)
      );
    })
  
      .map((item,index)=>{
        return(
           <div className="img-wrapper">
          <div className="image-show">
               
              <div className='img'>
              {item.imageUrls.map((img,index)=>{
                return(
               
                  <div className="img-collection">
                  <img src={img} alt={index}/>
                  </div>
                )
              })}
              </div>
               </div>
<div  className="profile">
            <h1>Images is uploaded By <mark>{item.username}</mark>. images is  Captured at the  place <mark>{item.place}</mark> . the uploaded Images count <mark style={{padding:"3px"}}> {item.imageUrls.length}</mark> </h1>
            </div>
            </div>
        )
      })
    }
   
      </div>
    </div>
  );
};

export default Images;
