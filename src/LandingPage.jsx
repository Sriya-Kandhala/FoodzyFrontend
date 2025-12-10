import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./LandingPage.css";

const videos = [
  "/vedios/vegvideo.mp4",
  "/vedios/nonvegvideo.mov",
  "/vedios/dessertsvedio.mp4",
  "/vedios/beveragesvideo.mp4",
];

const LandingPage = () => {
  const { token } = useSelector((state) => state.login);
  const [currentVideo, setCurrentVideo] = useState(0);

  // VIDEO LOOP LIKE HOME IMAGE SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-wrapper">

      <img 
      src="/images/foodzy.png" 
      alt="Foodzy Logo" 
      className="landing-logo"
    />

      {/* SINGLE VIDEO SLIDER */}
      <video
        key={currentVideo}
        src={videos[currentVideo]}
        autoPlay
        loop
        muted
        playsInline
        className="landing-video"
      />

      

      {/* DARK OVERLAY */}
      <div className="landing-overlay"></div>

      {/* CENTER TEXT */}
      <div className="landing-hero-content">
        <h1 className="hero-title">
          Delicious Food <br /> Delivered To Your Door
        </h1>

        <p className="hero-subtitle">
           Taste the freshness with every bite, delivered to your door        </p>
      </div>

      {/* TRUST BADGES */}
      <div className="hero-trust">
        <span>⭐ 4.8 Rated</span>
        <span>🚚 30 Min Delivery</span>
        <span>🔒 Secure Payments</span>
      </div>

    </div>
  );
};

export default LandingPage;
