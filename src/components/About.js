import React from "react";
import "../styles/About.css"; // Ensure to import the CSS file
import img from "../assets/Grid2.jpeg"; // Replace with your image

const About = () => {
  return (
    <div className="about-section" id="about">
      {/* Main container */}
      <div className="about-grid">
        {/* Image */}
        <div className="image-container">
          <img src={img} alt="About the company" className="about-image" />
        </div>

        {/* Text container */}
        <div className="text-container">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
          At <strong>Spacesio Design Studio</strong>, we believe every space tells a story.
                Based out of Chennai, we specialize in designing beautiful homes while ensuring
                they are functional for everyday living.
          </p>
          <p className="about-description">
          Our mission is to weave art, functionality, and design to create spaces that
                not only look stunning but feel like home. From cozy residential homes to dynamic
                commercial spaces, our designs reflect the values and ideas our customers hold closest
                to their hearts.
          </p>
          <p className="about-description">
                Are you looking for home interiors, bedroom interiors, kitchen interiors, or
                designs for your office space or studio? Get them all expertly crafted under one roof.
                With <strong>Spacesio</strong>, every project is a masterpiece tailored to align with your
                unique needs, style, and budget.
              </p>
              <p className="about-description">
                With our turnkey interior design services, we promise a smooth and seamless
                experience from concept to completion. Provide us with any space and style, and
                we'll transform it into a timeless design that inspires and delights.
              </p>
        </div>
      </div>
    </div>
  );
};

export default About;
