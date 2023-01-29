import React from "react";
import currency_logo from "../assets/currency-logo.svg";
import "../components/Home.css";

const Home = ({ onClick }) => {
  return (
    <div className="home-container">
      <button
        data-testid="home-button"
        className="home-button"
        onClick={onClick}
      >
        <i className="home-logo">
          <img alt="currency logo" src={currency_logo}></img>
        </i>
        <span>Update payment method</span>
      </button>
    </div>
  );
};

export default Home;
