import React, { useEffect, useState } from "react";
import "../styles/contact.css";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Check if the elements are in the viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  };

  // Add the 'show' class when the page loads or scrolls into view
  const animateOnScroll = () => {
    const container = document.querySelector(".container");
    const infoBoxes = document.querySelectorAll(".info-box");
    const formSection = document.querySelector(".form-section");

    if (isElementInViewport(container)) {
      setIsVisible(true);
    }

    infoBoxes.forEach((box) => {
      if (isElementInViewport(box)) {
        box.classList.add("show");
      }
    });

    if (isElementInViewport(formSection)) {
      formSection.classList.add("show");
    }
  };

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user starts typing
    setSuccessMessage(""); // Clear success message when user starts typing
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    const form = new FormData();
    form.append("access_key", "f19d6d76-ef90-42bd-aa6c-a270af398d0e"); // Replace with your actual access key
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false);
        if (data.success) {
          setSuccessMessage("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          setError("Failed to send the message. Please try again.");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError("Error occurred while sending the message.");
        console.error(error);
      });
  };

  useEffect(() => {
    // Trigger animation on scroll
    window.addEventListener("scroll", animateOnScroll);

    // Trigger animation on page load if elements are already in the viewport
    animateOnScroll();

    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);

  return (
    <div className="contact-body" id="contact">
      <div className="contact-container">
        <h1 className="contact-heading">Contact Us</h1>
        <span className="contact-underline"></span>
        <div className={`container`}>
          {/* Left Section: Vertical Info Boxes */}
          <div className="info-section">
            <div className={`info-box`}>
              <i className="fas fa-map-marker-alt"></i>
              <h3>Address</h3>
              <p>2/6, 4th Main Rd, Okkiayam, Thouraipakkam, Chennai</p>
            </div>
            <div className={`info-box`}>
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>spacesiodesigns@gmail.com</p>
            </div>
            <div className={`info-box`}>
              <i className="fas fa-phone-alt"></i>
              <h3>Phone</h3>
              <p>+91 8056068185</p>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className={`form-section`}>
            <h2>Book a Consultation with Our Designer</h2>
            <h3>
              Get in touch with us for inspiring interior design solutions
              tailored to your space.
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                />
                <i className="fas fa-user"></i>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
                <i className="fas fa-envelope"></i>
              </div>
              <div className="form-group">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled selected>
                    Select a Service
                  </option>
                  <option value="new-build">New Build</option>
                  <option value="large-scale">Large Scale Renovation</option>
                  <option value="full-furnishing">Full Furnishing</option>
                  <option value="interior-styling">Interior Styling</option>
                </select>
                <i className="fas fa-clipboard-list"></i>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  required
                  rows="1"
                  style={{ resize: "none" }}
                ></textarea>
                <i className="fas fa-comment-dots"></i>
              </div>
              {error && <div className="error-message">{error}</div>}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              <h2 className="contact-down-content">Prepare to walk into your space and truly be inspired!</h2>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
