import React from 'react'
import { Link } from 'react-router-dom'
import classes from './popularProperties.module.css'
import img1 from '../../../assets/realestatebeach.jpg'
import img2 from '../../../assets/realestatemountain.jpg'
import img3 from '../../../assets/realestatecountryside.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../../../util/fetchAPI'

const PopularProperties = () => {
  const [apartmentsProperties, setApartmentsProperties] = useState(0)
  const [townhouseProperties, setTownhouseProperties] = useState(0)
  const [colonyProperties, setColonyProperties] = useState(0)

  useEffect(() => {
    const fetchPropertiesNumber = async() => {
      try {
         const data = await request('/property/find/types', 'GET')
         
         setApartmentsProperties(data.apartments)
         setTownhouseProperties(data.townHouse)
        
         setColonyProperties(data.colony)
         
      } catch (error) {
        
        console.error(error)
      }
    }
    fetchPropertiesNumber()
  }, [])
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
        <h2>Properties</h2>
          <h5 className={classes.primaryText}>Best type of properties for you</h5>
          
        </div>
        <div className={classes.properties}>
          <Link to={`/apartmentsTypes`} className={classes.property}>
            <img src={img1} alt=''/>
            <div className={classes.quantity}>{apartmentsProperties} properties</div>
            <h5>Apartment properties</h5>
          </Link>
          <Link to={`/townhouseTypes`} className={classes.property}>
            <img src={img2} alt='' />
            <div className={classes.quantity}>{townhouseProperties} properties</div>
            <h5>Town House properties</h5>
          </Link>
          <Link to={`/colonyTypes`} className={classes.property}>
            <img src={img3} alt='' />
            <div className={classes.quantity}>{colonyProperties} properties</div>
            <h5>Colony properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties