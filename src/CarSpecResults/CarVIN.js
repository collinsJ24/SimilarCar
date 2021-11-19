import React, { useState } from "react";
import "./CarImage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; 

const CarVIN= (props) => {

 const [VinDetails, setVinDetails] = useState("");

 const setKeyword = (VIN) => {
     setVinDetails(VIN);
     props.VINdetails(VIN)
 }

  return (
 <div class="search">
 <input  onChange={(e) => setKeyword(e.target.value)} type="text" class="searchTerm" placeholder="Enter VIN To Retrieve Vehicle Details & Market Valuation For Your Car"/>
 
 <Link to={{pathname:"/VIN", state: {VINNumber: VinDetails }}} type="submit" class="searchButton"> 
 <FontAwesomeIcon icon={ faSearch }/>
 </Link>
</div>
  )
}

export default CarVIN;