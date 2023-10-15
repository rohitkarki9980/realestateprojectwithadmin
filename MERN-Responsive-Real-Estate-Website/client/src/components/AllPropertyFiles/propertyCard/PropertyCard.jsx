import React from 'react'
import classes from './propertyCard.module.css'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import person from '../../../assets/person.jpg'
import {AiOutlineHeart} from 'react-icons/ai'

const PropertyCard = ({ property }) => {
  const ownerProfileImg = property?.currentOwner?.profileImg
  const isVerified = property?.isVerified

  
    return (
         isVerified ? (
          <div className={classes.containerProperty} >
            <div key={property._id} className={classes.property}>
           
              <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}>
                <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
              </Link>
              <div className={classes.details}>
                <div className={classes.priceAndOwner}>
                  <span className={classes.price}>Npr {property.price}</span>
                  <img src={ownerProfileImg ? `http://localhost:5000/images/${ownerProfileImg}` : person} className={classes.owner} alt='' />
                </div>
                <div className={classes.moreDetails}>
                  <span>BHK:{property.BHK}</span>
                  <span>{property.sqmeters} square meters</span>
                </div>

                <div className={classes.desc}>
                  <span >Location:</span>:{property.location}
                </div>
                </div>
               
              </div>
            </div>
          ) : (
            <p className={classes.paragraphs}></p>
          )
          
    )
}

export default PropertyCard