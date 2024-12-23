import React, { useEffect, useState } from "react";
import './Slider.css';
import Img1 from "/bic.jpg";
import Img2 from "/car.png";
import Img3 from "/keke.png";
import Img4 from "/fash.png";
import Img5 from "/ps.png";


const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const showSlides = () => {
      const slides = document.querySelectorAll(".slide");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      setSlideIndex((prevIndex) =>
        prevIndex >= slides.length - 1 ? 0 : prevIndex + 1
      );
      slides[slideIndex].style.display = "block";
    };

    const interval = setInterval(showSlides, 4000); // Change slide every 3.5 seconds (2000ms)

    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div className="slider">
      <div className="slides">
        <div className={`slide ${slideIndex === 0 ? "active" : ""}`}>
          <img className="slideImg" src={Img1} alt="Image 1" />
        </div>

        <div className={`slide ${slideIndex === 1 ? "active" : ""}`}>
          <img className="slideImg" src={Img5} alt="Image 2" />
        </div>

        <div className={`slide ${slideIndex === 2 ? "active" : ""}`}>
          <img className="slideImg" src={Img2} alt="Image 3" />
        </div>

        <div className={`slide ${slideIndex === 3 ? "active" : ""}`}>
          <img className="slideImg" src={Img3} alt="Image 4" />
        </div>

        <div className={`slide ${slideIndex === 4 ? "active" : ""}`}>
          <img className="slideImg" src={Img4} alt="Image 5" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
