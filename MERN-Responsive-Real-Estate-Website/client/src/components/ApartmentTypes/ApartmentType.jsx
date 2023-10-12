import React, { useState, useEffect } from 'react';
import { request } from '../../util/fetchAPI';
import classes from './teraiType.module.css'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import person from '../../assets/person.jpg'

function TeraiTypes({ property }) {
  const [apartmentsOnly, setApartmentsOnly] = useState([]);
  const ownerProfileImg = property?.currentOwner?.profileImg;

  useEffect(() => {
    const fetchPropertiesNumber = async () => {
      try {
         const data = await request('/property/find/type', 'GET');
         setApartmentsOnly(data.apartments);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPropertiesNumber();
  }, []);

  return (
    <div className={classes.wrapper}>
     <div className={classes.titlesCity}>Apartments Property Details</div>
     <div className={classes.container}>
       {apartmentsOnly.length === 0 ? (
         <p className={classes.paragraph}>No properties of apartments</p>
       ) : (
         apartmentsOnly.map((property) => (
           <div key={property._id} className={classes.property}>
             <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}>
               <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
             </Link>
             <div className={classes.details}>
               <div className={classes.priceAndOwner}>
                 <span className={classes.price}>Npr {property.price}</span>
                 <img
                   src={ownerProfileImg ? `http://localhost:5000/images/${ownerProfileImg}` : person}
                   className={classes.owner}
                   alt=''
                 />
               </div>
               <div className={classes.moreDetails}>
                 <span>
                   {property.BHK} <FaBed className={classes.icon} />
                 </span>
                 <span>
                   {property.sqmeters} square meters <FaSquareFull className={classes.icon} />
                 </span>
               </div>
               <div className={classes.desc}>
                 <span>Desc</span>: {property.desc}
               </div>
             </div>
           </div>
         ))
       )}
     </div>
    </div>
  );
}

export default TeraiTypes;
