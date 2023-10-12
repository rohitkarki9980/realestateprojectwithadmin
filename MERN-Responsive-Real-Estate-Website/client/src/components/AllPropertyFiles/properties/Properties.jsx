import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { arrPriceRanges } from "../../../util/idxToPriceRange";
import classes from "./properties.module.css";
import { useEffect } from "react";
import { districtToIdx } from "../../../util/idxToContinent";
import { request } from "../../../util/fetchAPI";
import PropertyCard from "../../AllPropertyFiles/propertyCard/PropertyCard";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [state, setState] = useState(null);
  const query = useLocation().search.slice(1); // slice(1) to remove "?"
  const arrQuery = query.split("&");
  const navigate = useNavigate();

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await request(`/property/getAll`, "GET");
      setAllProperties(data);
    };
    fetchAllProperties();
  }, []);

  // parsing query params
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {};
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0];
        const value = option.split("=")[1];

        formattedQuery = { ...formattedQuery, [key]: value };

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState((prev) => formattedQuery);
          handleSearch(formattedQuery);
        }
      });
    }
  }, [allProperties, arrQuery]);

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSearch = (param = state) => {
    let options;
    if (param?.nativeEvent) {
      options = state;
    } else {
      options = param;
    }
  
    const filteredProperties = allProperties.filter((property) => {
      const priceRange = arrPriceRanges[options.priceRange];
      const minPrice = Number(priceRange.split("-")[0]);
      const maxPrice = Number(priceRange.split("-")[1]);

      const district = districtToIdx(property.district);
  
      return (
        property.type === options.type &&
        district === Number(options.district) &&
        property.price >= minPrice &&
        property.price <= maxPrice
      );
    });
  
    const queryStr = `type=${options.type}&district=${options.district}&priceRange=${options.priceRange}`;
    navigate(`/properties?${queryStr}`, { replace: true });
    
    // Use a function to set the state based on the previous state
    setFilteredProperties((prev) => [...filteredProperties]);
  };
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.firstTitle}>Search properties</h2>
        <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
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
          <select
            value={state?.priceRange}
            name="priceRange"
            onChange={handleState}
          >
            <option disabled style={{ color: "black", paddingBottom: "2px" }}>
              Select Price Range
            </option>
            <option value="0" style={{ color: "black" }}>
              <span>0-100,000</span>
            </option>
            <option value="1" style={{ color: "black" }}>
              <span>100,000-200,000</span>
            </option>
            <option value="2" style={{ color: "black" }}>
              <span>200,000-300,000</span>
            </option>
            <option value="3" style={{ color: "black" }}>
              <span>300,000-400,000</span>
            </option>
            <option value="4" style={{ color: "black" }}>
              <span>400,000-500,000</span>
            </option>
          </select>
          <select
            value={state?.district}
            name="district"
            onChange={handleState}
          >
              <option disabled  style={{color:"black",background:"red",height:"5rem"}}>Select District</option>
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
          <button className={classes.searchBtn}>
            <AiOutlineSearch
              className={classes.searchIcon}
              onClick={handleSearch}
            />
          </button>
        </div>
        <div className={classes.banner}></div>
        {filteredProperties?.length > 0 ? (
          <>
            <div className={classes.titles}>
              <h2>Property you may like</h2>
              <h5>Selected properties</h5>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <h2 className={classes.noProperty}>
            We have no properties with the specified options.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Properties;
