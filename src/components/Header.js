import React, { useState } from "react";
import "../styles/Header.css";
import brandlogo from "../assets/brand-logo.png"; // Ensure this path is correct

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      let offset = 0;
      if(element.id === "about") {
        offset = 100;
      }
      else{
        offset = 10;
      }
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY; // Calculate the absolute position
      const scrollToPosition = elementPosition - offset;
  
      // Add a slight delay to ensure React has rendered the target element
      setTimeout(() => {
        window.scrollTo({
          top: scrollToPosition,
          behavior: "smooth",
        });
      }, 0); // Delay can be increased if rendering is slow
    }
  };
  
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="#" className="logo" onClick={() => scrollToSection("home")}>
          <img src={brandlogo} alt="Brand Logo" className="header-logo" />
        </a>

        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={() => scrollToSection("home")}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => scrollToSection("about")}>
                About
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => scrollToSection("services")}>
                Products
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => scrollToSection("projects")}>
                Projects
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={() => scrollToSection("testimonials")}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => scrollToSection("contact")}>
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
