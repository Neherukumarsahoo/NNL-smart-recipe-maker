import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-content">
        Welcome to Smart Recipe Maker! Our mission is to make cooking simple, fun, and hassle-free. 
        Whether you’re a beginner or an expert, our AI-powered platform helps you find delicious recipes 
        based on the ingredients you have at home. No more food waste—just smart, tasty meals!
      </p>

      <h2 className="about-title">Meet Our Team</h2>
      <div className="team-container">
        <div className="team-card">
          <div className="team-image team1"></div>
          <h3>Neheru Kumar Sahoo</h3>
          <p>Lead Devloper</p>
        </div>
        <div className="team-card">
          <div className="team-image team2"></div>
          <h3>Loresh Kumar Dash</h3>
          <p>Database Manager</p>
        </div>
        <div className="team-card">
          <div className="team-image team3"></div>
          <h3>Nirod Chandra Mohanty</h3>
          <p>Lead Designer</p>
        </div>
      </div>
    </div>
  );
};

export default About;
