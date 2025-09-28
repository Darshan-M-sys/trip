import React, { useRef, useState, useEffect } from 'react';
import "./home.css";
import { GiHamburgerMenu } from "react-icons/gi";
import college from "./college.png";
import collegeImage from './image.png';
import hod from "./hod.jpg";
import bus1 from "./bus1.jpg";
import bus2 from "./bus2.jpg";
import bus3 from "./bus3.jpg";
import bus4 from "./bus4.jpg";
import bus5 from "./bus5.jpg";
import { Link } from 'react-router-dom';
import VisitorShow from './VisitorShow';
import Footer from './Footer';
import axios from 'axios';

const Home = () => {
  const menu = useRef(null);
  const [menuS, setMenuS] = useState(false);
  const [username, setUsername] = useState(""); 

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await axios.get("https://tripbackend-u7jf.onrender.com/user", { withCredentials: true });
      setUsername(res.data.username || "");
    } catch (err) {
      setUsername(""); // Not logged in
    }
  };

  useEffect(() => {
    fetchUser(); // fetch username on mount

    // IntersectionObserver
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('active');
          else entry.target.classList.remove('active');
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("https://tripbackend-u7jf.onrender.com/user/logout", {}, { withCredentials: true });
      setUsername(""); // Clear username immediately
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  // Menu toggle
  const clickMenu = () => {
    if (menuS) menu.current.style.left = "-290px";
    else menu.current.style.left = "0";
    setMenuS(!menuS);
  };

  return (
    <div>
      <div className="bg"></div>

      <div className="menu" onClick={clickMenu}>
        <GiHamburgerMenu />
      </div>

      <div ref={menu} className="menu-bar">
        <h2> Home</h2><hr/>
        <h2>About</h2><hr/>
        <Link to="uploadImages"><h2>Upload Images</h2></Link><hr/>
        <Link to="/visitor"><h2>Visitor Register</h2></Link><hr/> 
        <Link to="/images"><h2 style={{color:"white"}}> Memories</h2></Link><hr/>
        <Link to={username ? "/" : "/login"} style={{ textDecoration: "none" }}>
          <h2 className="login-text">{username ? username : "Login"}</h2>
        </Link>
        <h2> <a href="https://darshan-m-sys.github.io/portfolio/">About Developer</a></h2><hr/>
        {username && <h2 onClick={handleLogout} style={{color:"red"}}> Logout</h2>}
      </div>

      <div className="content">
  
        <header>
          <div className="college-name">
            <h1> NAVACHETHANA DEGREE COLLEGE</h1>
            <p>Tippu Nagar, Bangarpet-563114</p>
          </div>
          <div className="college-logo">
            <img style={{background:"white", borderRadius:"50%"}} src={college} alt="college" />
          </div>
        </header>
        <hr/>

    
        <div className="text1 animate-on-scroll">
          <h2> College Trip 2025</h2>
          <p>
 We, the students of Navachethana Degree College, are thrilled to embark on our exciting South India College Trip 2025! Our journey begins from Bangarpet to Kodaikanal, where we will enjoy the scenic hill station and its cool weather. Next, we will travel from Madurai to Sivaganga, exploring historical temples and cultural landmarks. From Sivaganga to Rameswaram and Dhanushkodi, we will witness breathtaking coastal beauty and visit iconic sites. Our adventure continues as we travel from Bangarpet to Sivaganga and finally to Samayapuram, before returning to Bangarpet, creating lifelong memories with friends.
          </p>
        </div>

  
        <div className="college-section animate-on-scroll">
          <div className="college-img">
            <img src={collegeImage} alt="college" />
          </div>
          <div className="text-college">
            <h2>ನವಚೇತನ ಪದವಿ ಕಾಲೇಜು</h2>
            <h1>Navachethana Degree College</h1>
            <p>Bangarpet - 563114</p>
            <h3>Education Courses</h3>
            <p>PUC - PCMB EBACS HEBA</p>
            <p>DEGREE - BCA BCOM</p>
            <p>
             Navachethana Degree College is committed to providing quality education and nurturing future leaders. Through our diverse range of courses, we empower students to excel in academics and succeed in their professional careers.
            </p>
          </div>
        </div>

        {/* HOD Section */}
        <div className="HOD animate-on-scroll">
          <h1>ABOUT BCA HOD</h1>
          <br/>
          <div className="HOD-profile">
            <img src={hod} alt="hod" />
            <div>
              <h2>Akshara Pavithra Devi</h2>
              <h3>HOD BCA Department</h3>
              <p>
              Miss Akshara Pavithra Devi, Head of the BCA Department at Navachethana Degree College, is an experienced educator and IT professional with a passion for mentoring students in the field of computer applications. With strong expertise in software development, programming, and emerging technologies, she is dedicated to fostering innovation, critical thinking, and practical skills among students, preparing them for successful careers in the technology industry.
              </p>
            </div>
          </div>
        </div>

        {/* Travel Section */}
        <div className="travel">
          <h1> Traveled BUS </h1>
          <div className="travel-img">
            <img src={bus1} alt="bus1" />
            <img src={bus2} alt="bus2" />
            <img src={bus3} alt="bus3" />
            <img src={bus4} alt="bus4" />
            <img src={bus5} alt="bus5" />
          </div>
        </div>

        {/* Visitors Section */}
        <div className="visitors">
          <h1>Visitors-Students-Lectures</h1>
          <VisitorShow/>
        </div>

        <Footer/>
      </div>
    </div>
  );
};

export default Home;
