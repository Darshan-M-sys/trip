import React, { useState } from "react";
import axios from "axios";
import "./visitor.css";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Visitors = () => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [experience, setExperience] = useState("");
  const [replay, setReplay] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }
    if (!username || !experience) {
      alert("Please fill Username and Experience fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("username", username);
    formData.append("experience", experience);

    try {
      setReplay("Please wait...");
       await axios.post(
        "https://tripbackend-u7jf.onrender.com/visitor",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setReplay("Upload successful!");
      setImage(null);
      setUsername("");
      setExperience("");
    } catch (err) {
      console.error(err);
      setReplay("Upload failed.");
    }
  };

  return (
    <div className="single-upload-container">
      <div className="login-text">
        <Link to="/">
          <p className="exit">
            <FaArrowLeft />
          </p>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="single-upload-form">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div className="preview">
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Experience (max 20 chars)"
          value={experience}
          maxLength={20}
          onChange={(e) => setExperience(e.target.value)}
        />

        <h3>{replay}</h3>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Visitors;
