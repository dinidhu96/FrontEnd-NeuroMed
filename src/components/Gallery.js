import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from "../assets/images/1.png";
import img2 from "../assets/images/2.png";
import img3 from "../assets/images/3.png";
import img4 from "../assets/images/4.png";
import img5 from "../assets/images/5.png";

export default function Gallery() {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slides",
    autoplaySpeed: 5000,
    autoplay: true,
    cssEase: "linear",
  };

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Slider {...settings}>
        <div>
          <img style={{ width: "100vw" }} src={img1} alt="img2" />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={img2} alt="img2" />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={img3} alt="img3" />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={img4} alt="img4" />
        </div>
        <div>
          <img style={{ width: "100vw" }} src={img5} alt="img4" />
        </div>
      </Slider>
    </div>
  );
}
