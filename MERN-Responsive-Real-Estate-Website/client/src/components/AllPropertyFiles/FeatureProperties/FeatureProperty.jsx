import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../../util/common";
import { request } from "../../../util/fetchAPI";
import './featureProperty.css'
import {Link } from "react-router-dom"
import {HiOutlineLocationMarker} from "react-icons/hi"

const Residencies = ({ property }) => {
  const [properties, setAllProperties] = useState([]);

  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await request(`/property/getAll`, "GET");
      setAllProperties(data);
    };
    fetchAllProperties();
  }, []);
  const maxCharacter= 40;

  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Feature Residencies</span>
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {/* slider */}
          {properties.slice(0, 8).map((property, i) => (
            <SwiperSlide key={property._id}>
              <Link to={`/propertyDetail/${property._id}`} style={{textDecoration: "none"}}>
           
              <div className="flexColStart r-card">
                <img
                  src={`http://localhost:5000/images/${property?.img}`}
                  alt="home"
                />
                <span className="secondaryText r-price">
                  <span style={{ color: "orange",fontWeight:"bold",fontSize:"1.2rem" }}>NPR <span style={{color:"black"}}>{property.price}</span></span>
    
                </span>
                <span className="primaryText">{property.title}</span>
                <span className="location" style={{ fontSize:"1.1rem",color:"black" }}>
                  <span style={{width: "10%"}}> <HiOutlineLocationMarker size={"20px"} color={'red'}/></span>
                   <span style={{ fontSize:"1rem",color:"black" }}>{property?.location}</span>
                   </span>
                
              </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
