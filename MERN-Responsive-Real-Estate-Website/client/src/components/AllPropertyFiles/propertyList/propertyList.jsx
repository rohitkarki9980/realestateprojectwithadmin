import React from "react";
import "./propertyList.css";
import PropertyCard from "../../AllPropertyFiles/propertyCard/PropertyCard";
import { useState, useEffect } from "react";
import { request } from "../../../util/fetchAPI";
import { ImSad2 } from "react-icons/im";

const PropertyList = ({ property }) => {
  const [allProperty, setAllProperty] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Initialize with an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [propertyTypes, setPropertyTypes] = useState({
    townhouse: false,
    colony: false,
    apartments: false,
  });
  // TODO here or somewhere home(fetching properties)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await request("/property/getAll", "GET");
        setAllProperty(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get the user's search query
    const query = searchQuery.toLowerCase();
    console.log(query);
    // Filter properties based on the search query
    const results = allProperty.filter((property) => {
      return (
        (!query ||
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.district.toLowerCase().includes(query)) &&
        (priceRange.min === "" || priceRange.min <= property.price) &&
        (priceRange.max === "" || priceRange.max >= property.price) &&
        ((propertyTypes.townhouse && property.type === "townhouse") ||
          (propertyTypes.colony && property.type === "colony") ||
          (propertyTypes.apartments && property.type === "apartments"))
      );
    });

    // Update the search results state
    setSearchResults(results);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="titlesOne">
          <h5 className="hText">Properties You may like </h5>
        </div>
        <div className="featuredProperties">
          <div className="lefter">
            
              <form onSubmit={handleSearch}>
                <div className="searchTerm">
                  <label>
                    Search Term:
                    </label>
                    <input
                      type="text"
                      placeholder="Search by title, location, or province"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="searchInput"
                    />
                 
                </div>

                <input
                  type="number"
                  placeholder="Min Price"
                  value={priceRange.min}
                  className="minPrice"
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={priceRange.max}
                  className="maxPrice"
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                />
                <div className="checker ">
                  <label className='labels'>Type:</label>
                  <div className="checkMate">
              
                    <input
                      type="checkbox"
                      checked={propertyTypes.townhouse}
                      className="checkBox"
                      onChange={(e) =>
                        setPropertyTypes({
                          ...propertyTypes,
                          townhouse: e.target.checked,
                        })
                      }
                    />
                    <label >
                    Townhouse
                  </label>
                  </div>
                  <div className="checkMate">
                    <input
                      type="checkbox"
                      checked={propertyTypes.colony}
                      className="checkBox"
                      onChange={(e) =>
                        setPropertyTypes({
                          ...propertyTypes,
                          colony: e.target.checked,
                        })
                      }
                    />
                   <label>
                  Colony
                  </label>
                </div>
                <div className="checkMate">
                    <input
                      type="checkbox"
                      checked={propertyTypes.apartments}
                      className="checkBox"
                      onChange={(e) =>
                        setPropertyTypes({
                          ...propertyTypes,
                          apartments: e.target.checked,
                        })
                      }
                    />
                      <label>
                    Apartments
                  </label>
                  </div>
                </div>
                {/* Add more filter inputs here, e.g., location, price range, etc. */}
                <button className='whiteButton borderRounded' type="submit">Search</button>
              </form>
            
          </div>
          <div className="propertyContainer">
            {searchQuery ||
            priceRange.min ||
            priceRange.max ||
            propertyTypes.townhouse ||
            propertyTypes.colony ||
            propertyTypes.apartments ? (
              searchResults.map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))
            ) : // Display a message when no search is performed
            allProperty?.length > 0 ? (
              allProperty.map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))
            ) : (
              <div className="warning">
                <h2>
                  No property currently on sale. <ImSad2 color="red" />{" "}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
