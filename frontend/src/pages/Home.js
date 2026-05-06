import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar stays fixed at the top */}
      <nav className="navbar">
        <div className="logo">
          BUDGET <span>EXPENSE</span> TRACKER
        </div>
        <div className="nav-buttons">
          <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
          <button className="btn-register" onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      {/* Hero content sits on top of the background */}
      <div className="hero-content">
        <h1 className="hero-title">
          Manage, and <span className="highlight">Analyze</span> <br /> 
          your expenses like a pro.
        </h1>
        <p className="hero-subtitle">
          The simplest way to track your spending and achieve your financial goals. <br />
          Take control of your financial life today.
        </p>

        <button
          className="get-started-btn"
          onClick={() => navigate("/login")}
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
}

export default Home;