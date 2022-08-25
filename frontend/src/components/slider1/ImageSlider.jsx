import React, { useState } from 'react';
import { SliderData } from './SliderData';
import "./imageSlider.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ImageSlider = ( ) => {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  
  };

  return (
    <div className='slider'>
      <span className='titleslider'>Tiêu chí bạn cần ?</span>
      <hr className="sidebarHr" />
      <Slider {...settings}>
        {SliderData.map((slide) => {
          return(
            <Link to="/searchpage" style={{ textDecoration: "none" }}>
              <div className='card-top'>
                <img src={slide.image} alt={slide.title}/>
                <h1>{slide.title}</h1>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default ImageSlider;
