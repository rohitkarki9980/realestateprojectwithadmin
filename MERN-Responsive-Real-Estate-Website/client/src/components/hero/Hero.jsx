import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./hero.module.css";
import imgOne from "../../assets/mobile.png";
import CountUp from "react-countup";
import { request } from "../../util/fetchAPI";
import { motion, useAnimation } from "framer-motion";
const Hero = () => {
  const [type, setType] = useState("apartments");
  const [district, setDistrict] = useState("0");
  const [priceRange, setPriceRange] = useState("0");
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const controls = useAnimation();

  const jump = async () => {
    await controls.start({ y: "-1rem" });
    await controls.start({ y: "0" });
  };

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(
      `/properties?type=${type}&district=${district}&priceRange=${priceRange}`
    );
  };
  useEffect(() => {

    const userCounts = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request(`/user/userCount`, "GET", options);
        setUserCount(data.count);
      } catch (error) {
        console.log(error);
      }
    };
    userCounts();
  }, [token]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
         <div className={classes.orangeCircleOne} />
        <motion.div 
        initial={{ x: "7rem", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2,
          type: "ease-in",
        }}
        
        
        className={classes.fLeft}>
         
          <img
            src={imgOne}
            style={{ width: "630px", height: "38rem" }}
            alt=""
          />
        </motion.div>

        <div className={classes.titleAndSelect}>
          <div className={classes.title}>
          <motion.div
      initial={{ y: "4rem", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 2,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      whileHover={{ scale: 1.1 }}
      onTap={jump}
      className={classes.orangeCircle}
    />

            <motion.h2
             initial={{ y: "2rem", opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{
               duration: 2,
               type: "ease-in",
             }}
             >
              Let us find your dream 
              <motion.div 
               initial={{ y: "2rem", opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{
                 duration: 2,
                 type: "ease-in",
               }}
              className={classes.Remain}>
                place right now...</motion.div>
            </motion.h2>
            <motion.h5
             initial={{ x: "2rem", opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{
               duration: 2,
               type: "ease-in",
             }}
            >Search the best selection of luxury real estate</motion.h5>
          </div>

          <div className={classes.options}>
            <select onChange={(e) => setType(e.target.value)}>
             <label></label>
            <option disabled style={{ color: "black", paddingBottom: "2px" }}>
              Select type
            </option>
            
            <option
              value="apartments"
              style={{ color: "black", paddingBottom: "2px" }}
            >
              <span>Apartments</span>
            </option>
            <option value="townhouse" style={{ color: "black" }}>
              <span>Town House</span>
            </option>
            <option value="colony" style={{ color: "black" }}>
              <span>Colony</span>
            </option>
            </select>
            <select onChange={(e) => setPriceRange(e.target.value)}>
            <label></label>
              <option  disabled style={{color:"black",background:"red",height:"5rem"}}>Select Price Range</option>
    
              <option value="0">
                <span>0-100,000</span>
              </option>
              <option value="1">
                <span>100,000-200,000</span>
              </option>
              <option value="2">
                <span>200,000-300,000</span>
              </option>
              <option value="3">
                <span>300,000-400,000</span>
              </option>
              <option value="4">
                <span>400,000-500,000</span>
              </option>
            </select>
            <select onChange={(e) => setDistrict(e.target.value)}>
            <label></label>
              <option disabled  style={{color:"black",background:"red",height:"5rem"}}>Select Province</option>
              <option value="0">
                <span>Province One</span>
              </option>
              <option value="1">
                <span>Province Two</span>
              </option>
              <option value="2">
                <span>Bagmati Province</span>
              </option>
              <option value="3">
                <span>Lumbini Province</span>
              </option>
              <option value="4">
                <span>Karnali province</span>
              </option>
              <option value="5">
                <span>SudarPaschim Province</span>
              </option>
            </select>
            <AiOutlineSearch
              className={classes.searchIcon}
              onClick={handleSearch}
            />
          </div>
          
         
        </div>
      </div>
    </div>
  );
};

export default Hero;
