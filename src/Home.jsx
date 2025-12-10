import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const images = [
  "/images/veg.jpg",
  "/images/nonveg.jpg",
  "/images/desserts.jpg",
  "/images/beverages.jpeg",
];

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  // Background image loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <div
        className="hero-slider"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <div className="overlay">
          <h1>Delicious Food Delivered To Your Doorstep 🍴</h1>
          <p>Veg | Non-Veg | Desserts | Beverages</p>

          <button className="explore-btn" onClick={() => {
    setShowMenu(true);
    // Scroll down after menu is rendered
    setTimeout(() => {
      const menu = document.getElementById("menuSection");
      if (menu) {
        window.scrollTo({
          top: menu.offsetTop, // scrolls to the menu section
          behavior: "smooth",  // smooth scrolling
        });
      }
    }, 100);// scrolls to top smoothly
  }}>
            Explore Menu
          </button>
        </div>
      </div>

      {/* MENU SECTION */}
      {showMenu && (
        <div className="menu-section" id="menuSection">
          <h2>Our Menu</h2>

          <div className="menu-cards">
            <div className="menu-card" onClick={() => navigate("/veg")}>
              <img src="/images/veg.jpg" alt="Veg" />
              <h3>Veg</h3>
            </div>

            <div className="menu-card" onClick={() => navigate("/nonveg")}>
              <img src="/images/nonveg.jpg" alt="Non-Veg" />
              <h3>Non-Veg</h3>
            </div>

            <div className="menu-card" onClick={() => navigate("/desserts")}>
              <img src="/images/desserts.jpg" alt="Desserts" />
              <h3>Desserts</h3>
            </div>

            <div className="menu-card" onClick={() => navigate("/beverages")}>
              <img src="/images/beverages.jpeg" alt="Beverages" />
              <h3>Beverages</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
