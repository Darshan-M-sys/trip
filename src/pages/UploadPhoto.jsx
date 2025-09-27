import React, { useState } from "react";
import axios from "axios";
import "./UploadPhoto.css";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const UploadPhoto = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [place, setPlace] = useState("");
  const [experience, setExperience] = useState("");
  const [replay, setReplay] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!place || !experience || images.length === 0) {
      alert("Please fill all fields and select at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("place", place);
    formData.append("experience", experience);
    images.forEach((image) => formData.append("images", image));

    setReplay("Please wait, uploading images...");

    try {
      const response = await axios.post(
        "https://tripbackend-u7jf.onrender.com/upload-multiple",
        formData,
        {
          withCredentials: true, // Important to send session cookie
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setReplay("Upload successful!");
        setPlace("");
        setExperience("");
        setImages([]);
      } else {
        setReplay(response.data.msg || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setReplay("Upload failed. Make sure you are logged in.");
      // If not logged in, redirect to login page
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="image-upload-container">
      <Link to="/">
        <p className="exit">
          <FaArrowLeft />
        </p>
      </Link>

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="upload-images">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <p>Click to upload Min-1 and Max-10 images</p>
          <div className="preview">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="preview-img"
              />
            ))}
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <button type="submit">Upload</button>
        <h1>{replay}</h1>
        <div className="disclaimer">
          <h1>Disclaimer</h1>
   <p>
            Don't upload unwanted images to this platform. Once uploaded, only
            the developer can remove them. On mobile, you can only upload single
            images. To upload multiple images,
            <a href="tel:7204221936">contact</a>  the 
         <a href="https://darshan-m-sys.github.io/portfolio/"> 
         <u> developer.</u>    </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UploadPhoto;
