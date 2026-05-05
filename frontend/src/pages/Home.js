import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // optional for styling

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">BUDGET EXPENSE TRACKER</div>

        <div className="nav-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>

      {/* Main Section */}
      <div className="main-section">
        <div className="left">
          <h1>Welcome to Budget Expense Tracker</h1>
          <p>
            Track, manage, and analyze your expenses like a pro.
            Take control of your financial life now!
          </p>

          <button
            className="get-started"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>

        <div className="right">
          <img src="/images/bg.png" alt="tracker" />
        </div>
      </div>

    </div>
  );
}

export default Home;