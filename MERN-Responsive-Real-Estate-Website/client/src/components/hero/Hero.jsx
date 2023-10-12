import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./hero.module.css";
import imgOne from "../../assets/mobile.png";
import CountUp from "react-countup";
import { request } from "../../util/fetchAPI";
const Hero = () => {
  const [type, setType] = useState("apartments");
  const [district, setDistrict] = useState("0");
  const [priceRange, setPriceRange] = useState("0");
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(null);
  const { user, token } = useSelector((state) => state.auth);

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
        <div className={classes.fLeft}>
         
          <img
            src={imgOne}
            style={{ width: "630px", height: "38rem" }}
            alt=""
          />
        </div>

        <div className={classes.titleAndSelect}>
          <div className={classes.title}>
            <div className={classes.orangeCircle} />

            <h2>
              Let us find your dream 
              <div className={classes.Remain}>
                place right now...</div>
            </h2>
            <h5>Search the best selection of luxury real estate</h5>
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
