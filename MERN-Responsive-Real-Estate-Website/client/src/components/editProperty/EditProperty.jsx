import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../util/fetchAPI";
import { BsFillHouseAddFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import classes from "./editProperty.module.css";

const EditProperty = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [error, setError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const data = await request(`/property/find/${id}`, "GET");
        setPropertyDetails(data);
        setPhoto(data.img);
        setInitialPhoto(data.img);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  const handleState = (e) => {
    setPropertyDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let filename = initialPhoto;
    if (photo && photo !== initialPhoto) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append("filename", filename);
      formData.append("image", photo);

      const options = {
        Authorization: `Bearer ${token}`,
      };

      await request("/upload/image", "POST", options, formData, true);
    }

    try {
      if (Object.values(propertyDetails).some((v) => v === "")) {
        setEmptyFields(true);
        setTimeout(() => {
          setEmptyFields(false);
        }, 2500);
        return;
      }

      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      await request(`/property/${id}`, "PUT", options, {
        ...propertyDetails,
        img: filename,
      });
      navigate(`/propertyDetail/${id}`);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className={classes.container}>
      <h2>Edit Property</h2>
      <div className={classes.wrapper}>
        <form onSubmit={handleUpdate} className={classes.wraps}>
          <input
            value={propertyDetails?.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleState}
          />
          <select required name="type" onChange={handleState}>
            <option disabled>Select Type</option>
            <option value="city">Terai</option>
            <option value="village">Hilly</option>
            <option value="mountain">Himalayan</option>
          </select>
          <input
            value={propertyDetails?.desc}
            type="text"
            placeholder="Desc"
            name="desc"
            onChange={handleState}
          />
          <select required name="district" onChange={handleState}>
            <option disabled>Select Province</option>
            <option value="Province One">Province One</option>
            <option value="Province Two">Province Two</option>
            <option value="Bagmati Province">Bagmati Province</option>
            <option value="North America">Lumbini Province</option>
            <option value="Karnali Province">Karnali Province</option>
            <option value="Sudarpaschim Province">Sudarpaschim Province</option>
          </select>
          <input
            value={propertyDetails?.price}
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleState}
          />
          <input
            value={propertyDetails?.sqmeters}
            type="number"
            placeholder="Sq. meters"
            name="sqmeters"
            onChange={handleState}
          />
          <input
            value={propertyDetails?.beds}
            type="number"
            placeholder="Beds"
            name="beds"
            step={1}
            min={1}
            onChange={handleState}
          />
           <input
                  value={propertyDetails?.location}
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={handleState}
                />
                
          <div className={classes.labels}>
            <label htmlFor="photo">
              Upload Property Picture <BsFillHouseAddFill size={"25px"} />{" "}
            </label>
            <input
              type="file"
              id="photo"
              style={{ display: "none" }}
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            {photo && <p>{photo.name}</p>}
          </div>
          <button type="submit" color="black" className={classes.bttn}>
            Edit
          </button>
        </form>
        {error && (
          <div className={classes.error}>
            There was an error editing the listing! Try again.
          </div>
        )}
        {emptyFields && (
          <div className={classes.error}>All fields must be filled!</div>
        )}
      </div>
    </div>
  );
};

export default EditProperty;
