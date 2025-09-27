import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import "./visitor.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-section">
          <h3>About</h3>
          <p>
            This platform allows users to share their experiences with photos. 
            Be respectful and only upload genuine content.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><a href="/">Home</a></p>
          <p><a href="/uploadImages">Upload</a></p>
          <p><a href="/visitor">Visitors</a></p>
         
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/darshan-m-79ab14375"><FaFacebook /></a>
            <a href="/"><FaTwitter /></a>
            <a href="https://www.instagram.com/darshan_micro_web/"><FaInstagram /></a>
            <a href="https://github.com/Darshan-M-sys"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Navachethana 2025 batch trip  Platform| All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
