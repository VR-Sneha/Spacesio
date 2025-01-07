import React, { useState, useEffect, useRef } from "react";
import "../styles/processPanel.css";
import img1 from "../assets/icon01-300x183.png";
import img2 from "../assets/72869.png";
import img3 from "../assets/workmen-installing-icon-vector.jpg";
import img4 from "../assets/OIP.jpg";
import backgroundImage from "../assets/background-doodle.jpg";

const states = [
  {
    title: "1. Consultation",
    description:
      "We begin by getting to know you, your space, and your vision. Through an in-depth discussion, we assess your style preferences, functional needs, and budget to lay the foundation for your dream design.",
    image: img1,
  },
  {
    title: "2. Planning",
    description:
      "Our team creates detailed floor plans, mood boards, and 3D renderings to align with your vision. This stage ensures every element is thoughtfully considered and functional, providing a clear roadmap for the project.",
    image: img2,
  },
  {
    title: "3. Material & Design Selection",
    description:
      "We help you select the perfect materials, textures, and finishes to bring your space to life. From furniture to lighting, every detail is chosen with care to reflect your personal style.",
    image: img4,
  },
  {
    title: "4. Execution",
    description:
      "Our skilled team manages the entire execution process, collaborating with trusted contractors and artisans. We ensure your space is brought to life with precision, quality, and a seamless experience.",
    image: img3,
  },
];

const Process = () => {
 {/* const divStyle = {
    backgroundImage: `url(${backgroundImage})`, // Path to your image
    backgroundSize: "cover", // Ensures the image covers the entire div
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents the image from repeating
  };*/}

  const [activeIndex, setActiveIndex] = useState(0);
  const contentContainerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const contentContainer = contentContainerRef.current;

    if (!contentContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contentContainer;
      const scrollProgress = scrollTop / (scrollHeight - clientHeight);
      const index = Math.min(
        Math.floor(scrollProgress * states.length),
        states.length - 1
      );
      setActiveIndex(index);
    };

    contentContainer.addEventListener("scroll", handleScroll);
    return () => contentContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePointClick = (index) => {
    const contentContainer = contentContainerRef.current;
    if (!contentContainer) return;

    const scrollHeight = contentContainer.scrollHeight;
    const clientHeight = contentContainer.clientHeight;
    const scrollPosition =
      (index / (states.length - 1)) * (scrollHeight - clientHeight);

    contentContainer.scrollTo({
      top: scrollPosition - 20, // Offset for better visibility
      behavior: "smooth",
    });
  };

  return (
    <div className="process-body" style={{/*divStyle*/}}>
      <div className="ProcessPanel">
        <h3>How to design your dream space?</h3>
        <span className="process-underline"></span>
      </div>
      <div className="process-app">
        <div className="process-circle-container">
          <div className="process-circle" ref={circleRef}>
            {states.map((_, index) => (
              <div
                key={index}
                className={`process-circle-point ${
                  activeIndex === index
                    ? "active"
                    : activeIndex > index
                    ? "visited"
                    : ""
                }`}
                onClick={() => handlePointClick(index)}
              >
                <span>{index + 1}</span>
              </div>
            ))}
            {/* Image inside the circle */}
            <div
              className="process-circle-image"
              style={{
                backgroundImage: `url(${states[activeIndex].image})`,
                opacity: 1, // Keep it fully visible for the active stage
              }}
            ></div>
          </div>
        </div>

        <div className="process-content-container" ref={contentContainerRef}>
          {states.map((state, index) => (
            <div
              key={index}
              className={`process-state-description ${
                activeIndex === index
                  ? "active"
                  : activeIndex < index
                  ? "inactive"
                  : "dim"
              }`}
            >
              <div className="process-state-box">
                <h2>{state.title}</h2>
                <div className="process-line"></div>
                <p>{state.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
